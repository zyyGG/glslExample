var o=`#ifdef GL_ES\r
precision mediump float;\r
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;\r
uniform float u_time;\r
uniform vec2 u_mouse;

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {\r
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {\r
    color = vec3(1.0);\r
  }\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy;\r
  vec3 color = vec3(0.0);\r
  uv -= u_resolution / 2.0;

  float r = length(uv - uv / 2.0);

  
  color += ((1.0 - smoothstep(30.0, 31.0, r - 0.5)) - (1.0 - smoothstep(30.0, 31.0, r + 0.5))) * vec3(0.35,0.76,0.83);\r
  color += ((1.0 - smoothstep(44.0, 45.0, r - 0.5)) - (1.0 - smoothstep(44.0, 45.0, r + 0.5))) * vec3(0.35,0.76,0.83);

  
  color += ((1.0 - step(2.0, r))) * vec3(sin(u_time * 10.0) * 0.8, sin(u_time * 10.0) * 0.3, 0.0);\r
  color += ((1.0 - smoothstep(3.0, 4.0, r - 0.5)) - (1.0 - smoothstep(3.0, 4.0, r + 0.5))) * vec3(1.0, 0.3, 0.0);

  
  color += ((1.0 - smoothstep(mod(u_time * 20.0, 30.0) / 30.0 * 80.0 - 1.0, mod(u_time * 20.0, 30.0) / 30.0 * 80.0 + 1.0, r - 0.5)) - (1.0 - smoothstep(mod(u_time * 20.0, 30.0) / 30.0 * (80.0 - 20.0) - 1.0, mod(u_time * 20.0, 30.0) / 30.0 * 80.0 + 1.0, r + 0.5))) * vec3(1.0, 0.3, 0.0);

  
  \r
  
  gl_FragColor = vec4(color, 1.0);\r
}`;export{o as default};
