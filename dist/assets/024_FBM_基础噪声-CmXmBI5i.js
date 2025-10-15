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
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;\r
}

float fbm (vec2 st){\r
  float f = 0.0;\r
  float a = 0.5;\r
  for (int i = 0; i < 5; i++){\r
    f += a * noise2d(st);\r
    
    st *= 2.0;\r
    a *= 0.5;\r
  }\r
  return f;\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv = uv * 2.0 - 1.0; 
  uv *= vec2(u_resolution.x / u_resolution.y, 1.0); 
  float noise = fbm(uv * 3.0); 
  float borderStrength = 0.03; 
  uv += (noise * 2.0 - 1.0) * borderStrength;\r
  
  float dist = length(uv - vec2(0.0)); 
  vec3 color = vec3(0.0, 0.0, 0.0); 
  color = mix(vec3(1.0, 0.5, 0.0), color, smoothstep(0.5, 0.51, dist)); 
  
  color = mix(color, vec3(noise), 0.5);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
