var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

float random2d(vec2 coord){\r
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);\r
}

float random1d(float coord){\r
  return sin(coord * 12.9898) * sin(coord * 78.233);\r
}

float random1d02(float coord){\r
  return sin(coord * 12.9898) * coord;\r
}

float random1d03(float x){\r
  float y = sin(x * 1.17);\r
  y += sin(x * 2.1);\r
  y += sin(x * 1.72);\r
  y += sin(x * 2.21);\r
  y += sin(x * 5.57);\r
  y *= 0.4;\r
  return y;\r
}

float noise2d(vec2 coord){\r
  vec2 i = floor(coord);\r
  vec2 f = fract(coord);\r
  float a = random2d(i);\r
  float b = random2d(i + vec2(1.0, 0.0));\r
  float c = random2d(i + vec2(0.0, 1.0));\r
  float d = random2d(i + vec2(1.0, 1.0));\r
  \r
  vec2 u = f * f * (3.0 - 2.0 * f);\r
  \r
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);\r
}\r

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv = uv * 2.0 - 1.0; 
  uv *= vec2(u_resolution.x / u_resolution.y, 1.0); 
  
  
  
  float noise = noise2d(uv * random1d03(u_time / 10.0) * 20.0); \r

  noise = noise * 0.6 + 0.4; 
  noise = noise * 2.0 - 1.0; 
  noise = noise * 0.01; 
  uv += noise; 
  
  
  \r
  
  vec3 color = vec3(0.0, 0.0, 0.0); 
  \r
  
  float rectWidth = 0.01; 

  vec2 rect1 = 1.0 - step(vec2(0.5, 0.5), abs(uv));\r
  vec2 rect2 = 1.0 - step(vec2(0.5 - rectWidth, 0.5 - rectWidth), abs(uv));\r
  vec2 rect = rect2.x * rect2.y - rect1; 
  
  
  

  
  vec2 center = vec2(0.0, 0.0);\r
  float dist = step(0.01, length(uv - center));\r
  color = mix(vec3(1.0, 1.0 , 1.0), color, dist);\r
  color = mix(color,vec3(1.0, 0.5, 0.0), rect.x * rect.y); 
  \r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
