var o=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

void point(inout vec3 color, vec2 pointCenter, float pointSize, vec3 pointColor){\r
  if(gl_FragCoord.x >= pointCenter.x - pointSize && gl_FragCoord.x < pointCenter.x + pointSize && gl_FragCoord.y >= pointCenter.y - pointSize && gl_FragCoord.y < pointCenter.y + pointSize){\r
    color = pow(sin(u_time * 10.0), 2.0) * pointColor;\r
  }\r
}\r

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  vec3 color = vec3(1.0, 1.0, 1.0);\r
  
  point(color, vec2(65.0, 85.0), 5.0 , vec3(1.0, 0.0, 0.0));\r
  \r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{o as default};
