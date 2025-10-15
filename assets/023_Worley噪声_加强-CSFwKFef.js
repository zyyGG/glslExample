var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec2 random2d(vec2 coord){\r
  return vec2(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453),\r
              fract(sin(dot(coord.yx, vec2(12.9898, 78.233))) * 43758.5453));\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv.x *= u_resolution.x / u_resolution.y; 
  uv *= 3.0;\r
  vec2 iUv = floor(uv);\r
  vec2 fUv = fract(uv); 
  

  
  float time = u_time;\r
  float result = 1.0;\r
  \r
  for(int y = -1; y <= 1; y++){\r
    for(int x = -1; x <= 1; x++){\r
      
      vec2 offsetPoint = vec2(float(x), float(y)); 
      
      
      
      vec2 rand = random2d(iUv + offsetPoint); 
      rand = 0.5 + 0.5 * sin(time + 6.2831*rand); 
      vec2 diff = offsetPoint + rand - fUv; \r
      
      
      result = min(result, length(diff)); 
    }\r
  }\r
  vec3 color = vec3(0.0);\r
  color += result;\r
  
  
  
  

  
  

  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
