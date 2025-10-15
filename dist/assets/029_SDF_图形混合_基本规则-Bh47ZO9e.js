var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

#define PI 3.14159265359\r

float sdf_circle(vec2 p, float r) {\r
  return length(p) - r;\r
}

float sdf_rect(vec2 p, vec2 b) {\r
  vec2 d = abs(p) - b;\r
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);\r
}\r

void main() {\r
  
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv = uv * vec2(3.0, 2.0);\r
  float col = uv.x;\r
  float row = uv.y;\r
  uv = fract(uv);\r
  uv = uv * 2.0 - 1.0; 
  uv.x *= (u_resolution.x * 2.0) / (u_resolution.y * 3.0); 
  

  vec3 color = vec3(1.0, 1.0, 1.0);

  
  float circle = sdf_circle(uv, 0.25);\r
  
  float rect = sdf_rect(uv + vec2(0.3, 0.0), vec2(0.3, 0.15));

  
  float final_shape = 1.0;\r
  vec3 shape_color = vec3(0.2, 0.6, 0.9);\r

  
  

  final_shape = rect; \r
  final_shape = max(circle, rect); 
  final_shape = min(circle, rect); 
  final_shape = max(-circle, rect); 
  final_shape = max(circle, -rect); 
  final_shape = max(min(circle, rect), -max(circle, rect)); \r

  
  if(row > 1.0) {\r
    
    if( col <  1.0) {\r
      final_shape = 1.0; 
    }\r
    
    else if( col < 2.0) {\r
      final_shape = max(circle, rect); 
    }\r
    
    else {\r
      final_shape = min(circle, rect); 
    }\r
  }\r
  else {\r
    
    if( col <  1.0) {\r
      final_shape = max(-circle, rect); 
    }\r
    
    else if( col < 2.0) {\r
      final_shape = max(circle, -rect); 
    }\r
    
    else {\r
      final_shape = max(min(circle, rect), -max(circle, rect)); 
    }\r
  }\r
  \r
  final_shape = smoothstep(0.0, 0.01, final_shape);\r
  final_shape = 1.0 - final_shape; 
  color = mix(color, shape_color, final_shape); 

  
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
