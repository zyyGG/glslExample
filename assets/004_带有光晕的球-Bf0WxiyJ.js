var r=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec3 ring(float radius, vec2 center, vec3 color){\r
  
  float distance1 = distance(gl_FragCoord.xy, center) / radius;\r
  float distance2 = distance(gl_FragCoord.xy, center) / radius;\r
  float pct = smoothstep(0.0, pow(sin(u_time), 2.0) * 2.5 + 0.5, distance2) * (1.0 - step(1.0, distance1 ));\r
  return mix(vec3(1.0), color, pct);\r
}

vec3 ring2(float radius, vec2 center, vec3 color){\r
  
  float distance1 = distance(gl_FragCoord.xy, center) / radius;\r
  float distance2 = distance(gl_FragCoord.xy, center + radius / 3.0) / radius;\r
  float pct = smoothstep(0.0, pow(sin(u_time), 2.0) * 1.5 + 0.5, distance2) * (1.0 - step(1.0, distance1 ));\r
  return mix(vec3(1.0), color, pct);\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  vec3 color = ring(150.0, vec2(300.0, 300.0), vec3(1.0, 0.0, 0.0));\r
  color *= ring2(150.0, vec2(900.0, 300.0), vec3(0.0, 1.0, 0.0));\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{r as default};
