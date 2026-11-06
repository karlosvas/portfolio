// name: Foco de color
// desc: La foto está en blanco y negro y el color aparece bajo el cursor, como un foco.
vec4 effect(vec2 uv) {
  vec4 c = sampleImage(uv);
  float g = dot(c.rgb, vec3(0.299, 0.587, 0.114));
  vec3 mono = vec3(g) * 0.9;
  float f = cursorFalloff(0.42);
  return vec4(mix(mono, c.rgb, f), c.a);
}
