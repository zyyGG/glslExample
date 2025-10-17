var e=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;\r
uniform vec2 u_mouse;\r
uniform sampler2D u_texture_0;

float sdf_circle(vec2 p, float r) {\r
  return length(p) - r;\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  float texture_scale = 2.0; 
  float offset = 1.0 / (texture_scale * 2.0); 
  uv = uv * 2.0 - 1.0;\r
  uv.x *= (u_resolution.x) / (u_resolution.y); 
  vec2 circle_offset = u_mouse.xy / u_resolution.xy * 2.0 - 1.0; 
  circle_offset.x *= (u_resolution.x) / (u_resolution.y); 

  
  float circle = sdf_circle(uv - circle_offset, .1);\r
  vec3 ciecle_color = vec3(0.8118, 0.1098, 0.9882);\r

  uv = uv + vec2(offset); 
  vec2 texture_uv = uv * texture_scale; 
  vec4 texture_0 = texture2D(u_texture_0, texture_uv);\r
  vec3 color = vec3(1.0);\r
  
  float pics_range = (uv.x < (uv.x / texture_uv.x) ? 1.0 : 0.0) * \r
  (uv.y < (uv.y / texture_uv.y) ? 1.0 : 0.0) * \r
  (uv.x > ((uv.x - texture_scale) / texture_uv.x) ? 1.0 : 0.0) * \r
  (uv.y > ((uv.y - texture_scale) / texture_uv.y) ? 1.0 : 0.0);

  float final_shape = 1.0;

  
  circle = smoothstep(0.0, 0.1, circle);

  \r
  
  \r

  
  
  

  
  color = mix(color, texture_0.rgb, pics_range); 
  
  
  color = mix(color, vec3(1.0), 1.0 - circle); 

  
  
  

  \r
  \r
  

  gl_FragColor = vec4(color, 1.0);\r
}`;export{e as default};
