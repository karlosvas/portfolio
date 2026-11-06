import vertexSource from "@/shaders/vertex_img.glsl?raw";

const PRELUDE = `#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_image;
uniform sampler2D u_trail;
uniform vec2 u_mouse;
uniform float u_hover;
uniform float u_time;
uniform float u_imageAspect;
uniform float u_canvasAspect;
uniform vec2 u_resolution;
uniform vec2 u_focus;
uniform vec3 u_accent;
uniform vec3 u_bg;
uniform vec3 u_fg;
uniform vec2 u_dim;

vec2 coverUV(vec2 uv) {
  float rx = min(u_canvasAspect / u_imageAspect, 1.0);
  float ry = min(u_imageAspect / u_canvasAspect, 1.0);
  return vec2(uv.x * rx + (1.0 - rx) * u_focus.x,
              uv.y * ry + (1.0 - ry) * u_focus.y);
}
vec4 sampleImage(vec2 uv) { return texture(u_image, coverUV(clamp(uv, 0.0, 1.0))); }
vec4 sampleImageLod(vec2 uv, float lod) { return textureLod(u_image, coverUV(clamp(uv, 0.0, 1.0)), lod); }
float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
vec2 toAspect(vec2 d) { return vec2(d.x * u_canvasAspect, d.y); }
float cursorFalloff(float radius) {
  return smoothstep(radius, 0.0, length(toAspect(v_texCoord - u_mouse))) * u_hover;
}
float trailAt(vec2 uv) { return texture(u_trail, vec2(uv.x, 1.0 - uv.y)).r; }
`;

const TRAIL_FRAGMENT = `#version 300 es
precision highp float;
in vec2 v_texCoord;
out vec4 outColor;
uniform sampler2D u_prev;
uniform vec2 u_mouse;
uniform vec2 u_prevMouse;
uniform float u_aspect;
uniform float u_active;
uniform float u_radius;
void main() {
  float prev = texture(u_prev, vec2(v_texCoord.x, 1.0 - v_texCoord.y)).r;
  float m = max(prev * 0.955 - 0.0045, 0.0);
  vec2 p = v_texCoord * vec2(u_aspect, 1.0);
  vec2 a = u_prevMouse * vec2(u_aspect, 1.0);
  vec2 b = u_mouse * vec2(u_aspect, 1.0);
  vec2 ab = b - a;
  float t = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-6), 0.0, 1.0);
  float brush = smoothstep(u_radius, 0.0, length(p - (a + ab * t))) * u_active;
  outColor = vec4(max(m, brush), 0.0, 0.0, 1.0);
}
`;

const buildFragment = (body: string): string => `${PRELUDE}
${body}
void main() {
  vec4 e = effect(v_texCoord);
  if (u_dim.y > 0.0) {
    float lift = smoothstep(0.03, 0.6, trailAt(v_texCoord));
    float veil = mix(u_dim.x, u_dim.y, (v_texCoord.x + v_texCoord.y) * 0.5);
    e.rgb *= 1.0 - veil * (1.0 - 0.7 * lift);
  }
  outColor = e;
}
`;

export interface ImageShaderOptions {
  canvas: HTMLCanvasElement;
  fragmentBody: string;
  imageSrc: string;
  focus?: [number, number];
  dim?: [number, number];
  pointerTarget?: HTMLElement;
  onReady?: () => void;
  onError?: (message: string) => void;
}

export interface ImageShaderHandle {
  destroy: () => void;
}

const TRAIL_SIZE = 128;
type Rgb = [number, number, number];

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "error desconocido";
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
};

const link = (gl: WebGL2RenderingContext, fragmentSource: string) => {
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.bindAttribLocation(program, 0, "a_position");
  gl.bindAttribLocation(program, 1, "a_texCoord");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
  return program;
};

const readThemeColor = (name: string, fallback: Rgb): Rgb => {
  const parts = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return parts.length === 3 && parts.every(Number.isFinite)
    ? [parts[0] / 255, parts[1] / 255, parts[2] / 255]
    : fallback;
};

export function createImageShader(options: ImageShaderOptions): ImageShaderHandle | null {
  const {
    canvas,
    fragmentBody,
    imageSrc,
    focus = [0.5, 0.15],
    dim,
    pointerTarget = canvas,
    onReady,
    onError,
  } = options;
  const fail = (message: string) => {
    console.error(`[imageShader] ${message}`);
    onError?.(message);
    return null;
  };

  const gl = canvas.getContext("webgl2");
  if (!gl) return fail("WebGL2 no disponible");

  const usesTrail = /trailAt/.test(fragmentBody) || dim !== undefined;
  const animated = /u_time/.test(fragmentBody);
  const brushRadius = Number(/const\s+float\s+BRUSH\s*=\s*([\d.]+)/.exec(fragmentBody)?.[1] ?? 0.17);

  let program: WebGLProgram;
  let trailProgram: WebGLProgram | null = null;
  try {
    program = link(gl, buildFragment(fragmentBody));
    if (usesTrail) trailProgram = link(gl, TRAIL_FRAGMENT);
  } catch (error) {
    return fail(String(error instanceof Error ? error.message : error).trim());
  }

  const bind = (location: number, data: number[]) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  };
  bind(0, [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
  bind(1, [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

  const locate = (prog: WebGLProgram, name: string) => gl.getUniformLocation(prog, name);
  const u = {
    mouse: locate(program, "u_mouse"),
    hover: locate(program, "u_hover"),
    time: locate(program, "u_time"),
    image: locate(program, "u_image"),
    trail: locate(program, "u_trail"),
    imageAspect: locate(program, "u_imageAspect"),
    canvasAspect: locate(program, "u_canvasAspect"),
    resolution: locate(program, "u_resolution"),
    focus: locate(program, "u_focus"),
    accent: locate(program, "u_accent"),
    bg: locate(program, "u_bg"),
    fg: locate(program, "u_fg"),
    dim: locate(program, "u_dim"),
  };
  const ut = trailProgram && {
    prev: locate(trailProgram, "u_prev"),
    mouse: locate(trailProgram, "u_mouse"),
    prevMouse: locate(trailProgram, "u_prevMouse"),
    aspect: locate(trailProgram, "u_aspect"),
    active: locate(trailProgram, "u_active"),
    radius: locate(trailProgram, "u_radius"),
  };

  const trailTex: WebGLTexture[] = [];
  const trailFbo: WebGLFramebuffer[] = [];
  let trailRead = 0;
  if (usesTrail) {
    for (let i = 0; i < 2; i++) {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TRAIL_SIZE, TRAIL_SIZE, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      trailTex.push(tex);
      trailFbo.push(fbo);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  let accent: Rgb = [0.66, 0.24, 0.13];
  let bg: Rgb = [0.96, 0.95, 0.93];
  let fg: Rgb = [0.11, 0.1, 0.09];
  const refreshTheme = () => {
    accent = readThemeColor("--accent", accent);
    bg = readThemeColor("--bg", bg);
    fg = readThemeColor("--fg", fg);
  };
  refreshTheme();
  const themeObserver = new MutationObserver(() => {
    refreshTheme();
    if (ready && !destroyed) draw(performance.now());
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  let targetHover = 0;
  let hover = 0;
  let mouseX = 0.5;
  let mouseY = 0.5;
  let prevMouseX = 0.5;
  let prevMouseY = 0.5;
  let imageAspect = 1;
  let ready = false;
  let visible = true;
  let destroyed = false;
  let quiet = 0;
  let raf = 0;
  const t0 = performance.now();

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
    if (targetHover === 0) {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    }
    targetHover = 1;
    quiet = 120;
    start();
  };
  const onPointerLeave = () => {
    targetHover = 0;
    quiet = 120;
    start();
  };
  pointerTarget.addEventListener("pointermove", onPointerMove);
  pointerTarget.addEventListener("pointerleave", onPointerLeave);
  pointerTarget.addEventListener("pointercancel", onPointerLeave);

  const onContextLost = (e: Event) => {
    e.preventDefault();
    stop();
    onError?.("Contexto WebGL perdido");
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  function resize() {
    const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  function stepTrail(aspect: number) {
    if (!trailProgram || !ut) return;
    const write = 1 - trailRead;
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, trailFbo[write]);
    gl!.viewport(0, 0, TRAIL_SIZE, TRAIL_SIZE);
    gl!.useProgram(trailProgram);
    gl!.activeTexture(gl!.TEXTURE1);
    gl!.bindTexture(gl!.TEXTURE_2D, trailTex[trailRead]);
    gl!.uniform1i(ut.prev, 1);
    gl!.uniform2f(ut.mouse, mouseX, mouseY);
    gl!.uniform2f(ut.prevMouse, prevMouseX, prevMouseY);
    gl!.uniform1f(ut.aspect, aspect);
    gl!.uniform1f(ut.active, targetHover);
    gl!.uniform1f(ut.radius, brushRadius);
    gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    trailRead = write;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }

  function draw(now: number) {
    resize();
    const aspect = canvas.width / Math.max(canvas.height, 1);
    hover += (targetHover - hover) * 0.1;
    stepTrail(aspect);

    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.clearColor(0, 0, 0, 0);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    gl!.useProgram(program);

    gl!.uniform1f(u.hover, hover);
    gl!.uniform1f(u.time, (now - t0) / 1000);
    gl!.uniform2f(u.mouse, mouseX, mouseY);
    gl!.uniform1f(u.imageAspect, imageAspect);
    gl!.uniform1f(u.canvasAspect, aspect);
    gl!.uniform2f(u.resolution, canvas.width, canvas.height);
    gl!.uniform2f(u.focus, focus[0], focus[1]);
    gl!.uniform3f(u.accent, ...accent);
    gl!.uniform3f(u.bg, ...bg);
    gl!.uniform3f(u.fg, ...fg);
    gl!.uniform2f(u.dim, dim?.[0] ?? 0, dim?.[1] ?? 0);
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, texture);
    gl!.uniform1i(u.image, 0);
    if (usesTrail) {
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, trailTex[trailRead]);
      gl!.uniform1i(u.trail, 1);
    }
    gl!.drawArrays(gl!.TRIANGLES, 0, 6);
  }

  function frame(now: number) {
    raf = 0;
    if (destroyed) return;
    draw(now);
    if (quiet > 0) quiet--;
    const settled = !animated && targetHover === 0 && hover < 0.001 && (!usesTrail || quiet === 0);
    if (!settled) start();
  }
  function start() {
    if (!raf && ready && visible && !document.hidden && !destroyed) raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  });
  observer.observe(canvas);
  document.addEventListener("visibilitychange", start);

  const resizeObserver = new ResizeObserver(() => {
    if (ready && !destroyed) draw(performance.now());
  });
  resizeObserver.observe(canvas);

  const texture = gl.createTexture();
  const image = new Image();
  image.onload = () => {
    if (destroyed) return;
    imageAspect = image.naturalWidth / image.naturalHeight;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    ready = true;
    draw(performance.now());
    onReady?.();
    start();
  };
  image.onerror = () => fail(`No se pudo cargar la imagen ${imageSrc}`);
  image.src = imageSrc;

  return {
    destroy() {
      destroyed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", start);
      pointerTarget.removeEventListener("pointermove", onPointerMove);
      pointerTarget.removeEventListener("pointerleave", onPointerLeave);
      pointerTarget.removeEventListener("pointercancel", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
