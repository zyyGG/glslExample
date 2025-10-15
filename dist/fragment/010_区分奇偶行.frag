#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(1.0);
  uv = uv * 10.0; 
  float odd = step(1.0, mod(uv.y, 2.0)); // 判断y坐标是否为偶数行
  color = mix(vec3(0.0), vec3(1.0), float(odd));
  gl_FragColor = vec4(color, 1.0);
}