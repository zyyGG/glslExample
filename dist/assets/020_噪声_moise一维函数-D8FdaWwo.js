var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {\r
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {\r
    color = vec3(1.0);\r
  }\r
}

float random2d(vec2 coord){\r
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);\r
}

float noise1d(float v){\r
  
  float i_v = floor(v);\r
  float f_v = fract(v);\r
  
  return mix(sin(i_v),sin(i_v  + 1.0), smoothstep(0.0, 1.0, f_v)); 
}\r

void main() {\r
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;\r
  vec3 color = vec3(1.0);\r
  uv *= vec2(2.0, 2.0); 
  
  
  color = vec3(noise1d(random2d(uv)));\r
  
  invertBackground(color);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
