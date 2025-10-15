var n=`precision mediump float;

uniform vec2 u_resolution;\r
uniform float u_time;

float random2d(vec2 uv){\r
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);\r
}

float noise(vec2 uv) {\r
  vec2 i = floor(uv);\r
  vec2 f = fract(uv);\r
  float a = random2d(i + vec2(0.0, 0.0));\r
  float b = random2d(i + vec2(1.0, 0.0));\r
  float c = random2d(i + vec2(0.0, 1.0));\r
  float d = random2d(i + vec2(1.0, 1.0));\r
  \r
  vec2 u = f * f * (3.0 - 2.0 * f);\r
  \r
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);\r
}

float fbm(vec2 uv) {\r
  float f = 0.0;\r
  float a = 0.5;\r
  for (int i = 0; i < 5; i++) {\r
    f += a * noise(uv);\r
    uv *= 2.0;\r
    a *= 0.5;\r
  }\r
  return f;\r
}

void main() {\r
  
  
  
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv = uv * 2.0 - 1.0; 
  uv = uv * vec2(u_resolution.x / u_resolution.y, 1.0); 
  float noiseStress = 3.0; 
  float noiseValue = noise(uv * noiseStress); 
  
  noiseValue = fbm(uv * noiseStress ); 
  vec3 color = vec3(1.0, 0.0, 0.0); 
  vec3 edgeColor = vec3(0.0, 1.0, 0.0); 
  float edge = smoothstep(0.0, noiseValue, mod(u_time / 5.0, 1.0)); 
  color = mix(color, edgeColor , edge); 
  
  
  
  gl_FragColor = vec4(color, 1.0 - edge); 
}`;export{n as default};
