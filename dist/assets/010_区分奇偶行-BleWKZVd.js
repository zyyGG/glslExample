var o=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  vec3 color = vec3(1.0);\r
  uv = uv * 10.0; \r
  float odd = step(1.0, mod(uv.y, 2.0)); 
  color = mix(vec3(0.0), vec3(1.0), float(odd));\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{o as default};
