var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;\r
uniform sampler2D u_texture_0;\r
uniform float u_mouse;

float sdHexagon( in vec2 p, in float r )\r
{\r
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);\r
    p = abs(p);\r
    p -= 2.0 * min(dot(k.xy,p),0.0) * k.xy;\r
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\r
    return length(p)*sign(p.y);\r
}

float draw_texture_01(){\r
  float cols = 14.0;\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv = uv * vec2(cols, cols * (u_resolution.y / u_resolution.x));\r
  uv = fract(uv);\r
  \r
  float hexagon = sdHexagon(uv - vec2(0.5), 0.4);\r
  hexagon = smoothstep(0.01, 0.04, abs(hexagon));\r
  return hexagon;\r
}\r

float draw_texture_02(vec2 uv){\r
  float cols = 20.0;\r
  float border = 0.2;\r
  uv = uv * vec2(cols, cols * (u_resolution.y / u_resolution.x));\r
  uv = fract(uv);\r
  
  
  float line = smoothstep(0.0, border, uv.x) * \r
                smoothstep(0.0, border, uv.y) * \r
                smoothstep(0.0, border, 1.0 - uv.x) * \r
                smoothstep(0.0, border, 1.0 - uv.y);\r
  return 1.0 - line;\r
}

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
}\r

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  vec3 color = vec3(0.0);\r
  vec3 bgColor = color;\r
  float hexagon = 1.0 - draw_texture_01(); 
  float noise = fbm(uv * 1.0);\r
  float grid = draw_texture_02(uv * noise + vec2(u_time / 100.0, u_time / 80.0));\r
  \r
  
  
  vec3 patternColor = mix(vec3(0.2, 0.6, 1.0), vec3(1.0, 0.0, 0.0), grid);\r
  color = mix(color, patternColor, hexagon);\r
  \r
  

  
  
  
  
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
