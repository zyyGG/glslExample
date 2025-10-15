var o=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv = uv * vec2(u_resolution.x/u_resolution.y, 1.0);\r
  vec3 color = vec3(sin(u_time) * 0.5 + 0.5);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{o as default};
