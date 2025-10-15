#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// 绘制圆
float drawPoint(vec2 uv) {
  float radius = 0.3; // 圆的半径
  float dist = distance(uv, vec2(0.5)); // 计算当前像素到圆心的距离
  return 1.0 - smoothstep(radius, radius + 0.01, dist); // 使用smoothstep函数来平滑圆的边缘
}

// 奇偶偏移
bool oddOffset(float x) {
  float result = step(1.0, mod(x, 2.0)); // 判断y坐标是否为偶数行
  return result == 1.0; // 如果y是偶数行，则偏移0.5，否则偏移-0.5
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // 宽高比例
  float heightScale = u_resolution.x / u_resolution.y;
  uv = uv / vec2(1.0 , heightScale); // 缩放uv坐标 让每一格都是正方形
  uv = uv * 10.0;
  if(mod(u_time, 2.0) <= 1.0){
    uv.x += oddOffset(uv.y) ? (mod(u_time, 1.0) * 1.0) : (mod(u_time, 1.0) * -1.0); // 将坐标中心移动到(0,0)
  } else {
    uv.y += oddOffset(uv.x) ? (mod(u_time, 1.0) * 1.0) : (mod(u_time, 1.0) * -1.0);
  }
  
  uv = fract(uv); // 分割空间 50*50的格子,
  vec3 color = drawPoint(uv) * vec3(0.9, 0.4, 0.3); // 灰度较高额红色
  
  gl_FragColor = vec4(color, 1.0);
}