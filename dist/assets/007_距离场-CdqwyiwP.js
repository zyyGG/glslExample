var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv.x *= u_resolution.x / u_resolution.y; 
  vec3 color = vec3(0.0);\r
  float d = 0.0; 
  \r
  uv = uv * 2.0 - 1.0; 
  d = length(abs(uv) - 0.3); 
  
  d = length(max(abs(uv) - 0.3, 0.0)); 
  color = fract(vec3(d * 10.0)); 
  
  
  
  
  
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
