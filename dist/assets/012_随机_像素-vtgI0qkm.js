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

float random(vec2 uv) {\r
  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 48965.43658);\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;\r
  vec3 color = vec3(0.0);\r
  uv *= 20.0; 
  
  vec2 ipos = floor(uv);  
  
  vec2 fpos = fract(uv);  
  color = random(ipos) + color; 
  
  invertBackground(color);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{o as default};
