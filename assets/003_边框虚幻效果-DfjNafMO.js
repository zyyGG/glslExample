var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

float random2d(vec2 coord){\r
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);\r
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
  
  vec3 color = vec3(0.0, 0.0, 0.0); 
  \r
  
  float rectWidth = 0.01; 

  vec2 rect1 = 1.0 - step(vec2(0.5, 0.5), abs(uv));\r
  vec2 rect2 = 1.0 - step(vec2(0.5 - rectWidth, 0.5 - rectWidth), abs(uv));\r
  vec2 rect = rect2.x * rect2.y - rect1; 
  
  
  

  
  vec2 center = vec2(0.0, 0.0);\r
  float dist = step(0.01, length(uv - center));\r
  color = mix(vec3(1.0, 1.0 , 1.0), color, dist);

  
  float noise = noise2d(uv * 20.0); 
  noise = noise * 0.6 + 0.4; 
  
  
  rect *= noise; 

  color = mix(color,vec3(1.0, 0.5, 0.0), rect.x * rect.y); 
  \r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
