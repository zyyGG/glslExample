var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

float drawPoint(vec2 uv) {\r
  float radius = 0.3; 
  float dist = distance(uv, vec2(0.5)); 
  return 1.0 - smoothstep(radius, radius + 0.01, dist); 
}

bool oddOffset(float x) {\r
  float result = step(1.0, mod(x, 2.0)); 
  return result == 1.0; 
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  
  float heightScale = u_resolution.x / u_resolution.y;\r
  uv = uv / vec2(1.0 , heightScale); 
  uv = uv * 10.0;\r
  if(mod(u_time, 2.0) <= 1.0){\r
    uv.x += oddOffset(uv.y) ? (mod(u_time, 1.0) * 1.0) : (mod(u_time, 1.0) * -1.0); 
  } else {\r
    uv.y += oddOffset(uv.x) ? (mod(u_time, 1.0) * 1.0) : (mod(u_time, 1.0) * -1.0);\r
  }\r
  \r
  uv = fract(uv); 
  vec3 color = drawPoint(uv) * vec3(0.9, 0.4, 0.3); 
  \r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
