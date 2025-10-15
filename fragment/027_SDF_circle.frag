#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float sdf_circle(vec2 p, float radius){
  // 首先算出圆心到当前点的距离， 然后减去半径。
  return length(p) - radius;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0; // Convert to NDC 坐标变为 [-1, 1]
  uv.x *= u_resolution.x / u_resolution.y; // Aspect ratio
  vec3 color = vec3(0.9, 0.9, 0.5); // 背景颜色
  vec3 targetColor = vec3(1.0, 0.5, 0.5); // 图形的颜色
  float dist = sdf_circle(uv, 0.3); // Circle SDF
  dist = smoothstep(0.0, 0.01, dist); // 所有的模糊处都变为 0.0, 或者1.0
  color = mix(targetColor, color, dist);
  gl_FragColor = vec4(color, 1.0);
}