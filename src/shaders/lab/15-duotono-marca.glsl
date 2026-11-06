const float BRUSH = 0.34;
vec4 effect(vec2 uv) {
  vec4 c = sampleImage(uv);
  float m = smoothstep(0.03, 0.6, trailAt(uv));
  if (m < 0.002) return c;

  float lum = clamp((luma(sampleImageLod(uv, 0.5).rgb) - 0.03) * 2.6, 0.0, 1.0);
  lum = smoothstep(0.0, 1.0, lum);
  vec3 shadow = u_fg * 0.10;
  vec3 mid = u_accent;
  vec3 high = mix(u_accent, vec3(1.0, 0.97, 0.92), 0.5);
  vec3 duo = lum < 0.5 ? mix(shadow, mid, lum * 2.0) : mix(mid, high, (lum - 0.5) * 2.0);
  return vec4(mix(c.rgb, duo, m), 1.0);
}
