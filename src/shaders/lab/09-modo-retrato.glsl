// name: Modo retrato
// desc: Enfoque selectivo de cámara: el fondo se desenfoca con bokeh y la cara bajo el cursor queda nítida.
vec4 effect(vec2 uv) {
  float d = length(toAspect(uv - u_mouse));
  float focus = smoothstep(0.52, 0.22, d);          // 1 = nítido
  float blur = (1.0 - focus) * u_hover;             // 0..1

  float rad = blur * 0.013;
  float lod = blur * 0.9;
  vec3 acc = vec3(0.0);
  float wsum = 0.0;
  for (int i = 0; i < 24; i++) {
    float fi = float(i);
    float r = sqrt((fi + 0.5) / 24.0);
    float a = fi * 2.39996323;                      // ángulo áureo: reparto uniforme del disco
    vec2 off = vec2(cos(a), sin(a)) * r * rad * vec2(1.0 / u_canvasAspect, 1.0);
    vec3 s = sampleImageLod(uv + off, lod).rgb;
    float w = 1.0 + luma(s) * 2.5;                  // las luces pesan más: da el aspecto de bokeh
    acc += s * w;
    wsum += w;
  }
  vec3 col = acc / wsum;
  col *= mix(1.0, 0.86, blur);                       // viñeta suave fuera del foco
  return vec4(col, 1.0);
}
