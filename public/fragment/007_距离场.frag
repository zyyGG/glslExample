#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv.x *= u_resolution.x / u_resolution.y; // 保持宽高比
  vec3 color = vec3(0.0);
  float d = 0.0; // 初始化
  
  uv = uv * 2.0 - 1.0; // 将数值归一化为-1到1之间 ，形成四个象限
  d = length(abs(uv) - 0.3); // 计算距离
  // d = length(length( min(abs(uv) - 0.3, 0.0) )); // 计算距离
  d = length(max(abs(uv) - 0.3, 0.0)); // 计算距离
  color = fract(vec3(d * 10.0)); // 计算颜色后取余数
  // color = vec3(step(0.3, d)); // 用阶跃函数来控制颜色
  // color = vec3(step(d, 0.3)); // 用阶跃函数来控制颜色
  // color = vec3(step(0.3, d) * step(0.5, d)); // 用阶跃函数来控制颜色
  // color = vec3(step(0.3, d) * step(d, 0.4)); // 用阶跃函数来控制颜色
  // color = vec3(smoothstep(0.3, 0.4, d) * smoothstep(0.6, 0.5, d)); // 用平滑阶跃函数来控制颜色
  gl_FragColor = vec4(color, 1.0);
}