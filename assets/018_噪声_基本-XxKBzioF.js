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

void main() {\r
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;\r
  vec3 color = vec3(0.0);\r
  uv *= 4.0; \r
  vec2 i_uv = floor(uv);\r
  vec2 f_uv = fract(uv);\r
  float result_1 = random2d(i_uv); 
  float result_2 = random2d(f_uv); 
  float result_3 = mix(random2d(i_uv), random2d(i_uv) + 1.0, f_uv.x * f_uv.y); 
  float result_4 = mix(random2d(i_uv), random2d(i_uv) + 1.0, smoothstep(0.0, 1.0, f_uv.x * f_uv.y )); 
  vec2 u = f_uv * f_uv * (3.0 - 2.0 * f_uv); 
  float result_5 = mix(random2d(i_uv), random2d(i_uv) + 1.0, u.x * u.y); 

  
  
  
  
  
  color = vec3(vec2(result_5), 1.0); 

  invertBackground(color);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
