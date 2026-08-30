#version 300 es
precision highp float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform float u_hover;
uniform float u_imageAspect;
uniform float u_canvasAspect;

vec2 getCoverUV(vec2 uv) {
  float ratioX = min(u_canvasAspect / u_imageAspect, 1.0);
  float ratioY = min(u_imageAspect / u_canvasAspect, 1.0);
  return vec2(uv.x * ratioX + (1.0 - ratioX) * 0.5,
              uv.y * ratioY + (1.0 - ratioY) * 0.5);
}

void main() {
  vec2 coverUV = getCoverUV(v_texCoord);

  float dist = distance(v_texCoord, u_mouse);
  float radius = 0.35;
  float falloff = smoothstep(radius, 0.0, dist) * u_hover;

  float blockSize = mix(1.0, 40.0, falloff);
  vec2 pixelatedUV = floor(coverUV * blockSize) / blockSize;

  vec2 finalUV = mix(coverUV, pixelatedUV, falloff);
  outColor = texture(u_image, finalUV);
}
