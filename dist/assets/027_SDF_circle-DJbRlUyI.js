var r=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

float sdf_circle(vec2 p, float radius){\r
  
  return length(p) - radius;\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  uv = uv * 2.0 - 1.0; 
  uv.x *= u_resolution.x / u_resolution.y; 
  vec3 color = vec3(0.9, 0.9, 0.5); 
  vec3 targetColor = vec3(1.0, 0.5, 0.5); 
  float dist = sdf_circle(uv, 0.3); 
  dist = smoothstep(0.0, 0.01, dist); 
  color = mix(targetColor, color, dist);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{r as default};
