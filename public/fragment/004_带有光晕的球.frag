#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// 光晕效果
vec3 ring(float radius, vec2 center, vec3 color){
  // 分析，
  float distance1 = distance(gl_FragCoord.xy, center) / radius;
  float distance2 = distance(gl_FragCoord.xy, center) / radius;
  float pct = smoothstep(0.0, pow(sin(u_time), 2.0) * 2.5 + 0.5, distance2) * (1.0 - step(1.0, distance1 ));
  return mix(vec3(1.0), color, pct);
}

// 偏移光晕
vec3 ring2(float radius, vec2 center, vec3 color){
  // 分析，
  float distance1 = distance(gl_FragCoord.xy, center) / radius;
  float distance2 = distance(gl_FragCoord.xy, center + radius / 3.0) / radius;
  float pct = smoothstep(0.0, pow(sin(u_time), 2.0) * 1.5 + 0.5, distance2) * (1.0 - step(1.0, distance1 ));
  return mix(vec3(1.0), color, pct);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = ring(150.0, vec2(300.0, 300.0), vec3(1.0, 0.0, 0.0));
  color *= ring2(150.0, vec2(900.0, 300.0), vec3(0.0, 1.0, 0.0));
  gl_FragColor = vec4(color, 1.0);
}


