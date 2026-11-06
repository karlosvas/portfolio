float box(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

vec4 effect(vec2 uv) {
  vec4 c = sampleImage(uv);
  vec2 p = toAspect(uv - u_mouse);
  float aa = 1.5 / u_resolution.y;
  float h = 0.105 * (0.82 + 0.18 * u_hover);
  float t = 0.0032;
  float corner = 0.038;
  vec2 q = abs(p);

  float bracket = min(box(q - vec2(h, h - corner * 0.5), vec2(t, corner * 0.5 + t)),
                      box(q - vec2(h - corner * 0.5, h), vec2(corner * 0.5 + t, t)));
  float cross = min(box(p, vec2(0.009, 0.0022)), box(p, vec2(0.0022, 0.009)));
  float marks = smoothstep(aa, 0.0, min(bracket, cross));

  float n = 30.0;
  vec2 g = uv * vec2(n * u_canvasAspect, n);
  vec2 local = fract(g) - 0.5;
  float near = smoothstep(0.24, 0.05, length(p));
  float dots = smoothstep(0.1 + 0.06 * near, 0.04, length(local)) * near;

  float inside = smoothstep(h + 0.01, h - 0.01, max(q.x, q.y));
  vec3 col = c.rgb * (1.0 + 0.2 * inside * u_hover);
  col = (col - 0.5) * (1.0 + 0.1 * inside * u_hover) + 0.5;

  float overlay = clamp(max(marks, dots * 0.85), 0.0, 1.0) * u_hover;
  return vec4(mix(col, u_accent, overlay), 1.0);
}
