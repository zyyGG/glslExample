var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec2 i_resolution = vec2(400.0, 400.0);

float random(vec2 _uv){\r
  return fract(sin(dot(_uv.xy, vec2(12.9898, 78.233))) * 43758.5453);\r
}

void point(inout vec3 color, vec2 pointCenter, float pointSize, vec3 pointColor){\r
  if(gl_FragCoord.x >= pointCenter.x - pointSize && gl_FragCoord.x < pointCenter.x + pointSize && gl_FragCoord.y >= pointCenter.y - pointSize && gl_FragCoord.y < pointCenter.y + pointSize){\r
    color = pow(sin(u_time * 10.0), 2.0) * pointColor;\r
  }\r
}

float noise(vec2 _uv){\r
  
  
  vec2 i_uv = floor(_uv);\r
  
  vec2 f_uv = fract(_uv);\r
  
  vec2 u = smoothstep(0.0, 1.0, f_uv); 
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  return mix(mix(random(i_uv + vec2(0.,0.)), random(i_uv + vec2(1.,0.)), u.x), mix(random(i_uv + vec2(0.,1.)), random(i_uv + vec2(1.,1.)), u.x), u.y);\r
}

mat2 rotate2d(float angle){\r
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));\r
}

float lines(in vec2 pos, float b){\r
  float scale = 10.0;\r
  pos *= scale;\r
  return smoothstep(0.0, 0.5 + b * 0.5, abs(sin(pos.x * 3.1415) + b * 2.0) * 0.5);\r
}

void invertBackground(inout vec3 color) {\r
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {\r
    color = vec3(1.0);\r
  }\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;\r
  vec3 color = vec3(0.0);

  
  
  
  
  vec2 pos = uv * 5.0;

  
  float pattern = pos.y;

  
  
  
  pos = rotate2d(noise(pos)) * pos;\r
  

  pattern = lines(pos, 0.3);\r
  

  color = vec3(pattern);\r
  

  point(color, vec2(0.8, 0.1) * i_resolution, 2.0 , vec3(1.0, 0.0, 0.0));

  invertBackground(color);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
