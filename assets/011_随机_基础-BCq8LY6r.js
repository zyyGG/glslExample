var o=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;\r
uniform vec2 u_mouse;

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {\r
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {\r
    color = vec3(1.0);\r
  }\r
}

float random2d(vec2 coord){\r
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;\r
  vec3 color = vec3(1.0);\r
  
  
  uv *= vec2(10.0, 10.0); 
  
  float random_speed = random2d(floor(vec2(0.0, uv.y))); \r
  
  float random_direction = step(0.5, random_speed) * 2.0 - 1.0;\r
  
  
  
  uv.x += u_time * (10.0 * random_speed + 10.0) * random_direction;\r
  float random_ipos = random2d(floor(uv));\r
  color = step(0.55, random_ipos) * color; 
  invertBackground(color);  \r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{o as default};
