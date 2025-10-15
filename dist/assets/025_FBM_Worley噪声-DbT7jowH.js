var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec2 random2d(vec2 coord){\r
  return vec2(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453),\r
              fract(sin(dot(coord.yx, vec2(8.9899, 79.235))) * 85.8355));\r
}

float noise2d(vec2 uv){\r
  vec2 iUv = floor(uv);\r
  vec2 fUv = fract(uv); 

  float result = 1.0;

  for(int y = -1; y <= 1; y++){\r
    for(int x = -1; x <= 1; x++){\r
      vec2 offsetPoint = vec2(float(x), float(y)); 
      vec2 randCount = random2d(iUv + offsetPoint); 
      randCount = 0.5 + 0.5 * sin(6.2831*randCount); 
      vec2 diff = offsetPoint + randCount - fUv;\r
      result = min(result, length(diff)); 
    }\r
  }

  return result;\r
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
