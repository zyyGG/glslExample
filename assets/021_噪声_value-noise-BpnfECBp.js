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

float rand(vec2 _uv){\r
  return fract(sin(dot(_uv.xy, vec2(12.9898, 75.233))) * 43759.5452);\r
}

float noise(vec2 _uv){\r
  vec2 i_uv = floor(_uv);\r
  vec2 f_uv = fract(_uv);\r
  
  float a = rand(i_uv);\r
  float b = rand(i_uv + vec2(1.0, 0.0));\r
  float c = rand(i_uv + vec2(0.0, 1.0));\r
  float d = rand(i_uv + vec2(1.0, 1.0));

  
  vec2 u = smoothstep(0.0, 1.0, f_uv); 

  
  float result = mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;

  return result;\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;\r
  vec3 color = vec3(0.0);\r
  uv = uv * 50.0;\r
  color = vec3(noise(uv));

  vec2 uv1 = fract(vec2(uv.x, uv.y));\r
  vec2 uv2 = vec2(uv.x * 0.33 + i_resolution.x * 0.33, uv.y);\r
  vec2 uv3 = vec2(uv.x * 0.33 + i_resolution.x * 0.66, uv.y);

  vec2 uv1_shape = smoothstep(0.0, 0.2, uv1) * smoothstep(0.0, 0.2, 1.0 - uv1);\r
  
  \r
  invertBackground(color);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
