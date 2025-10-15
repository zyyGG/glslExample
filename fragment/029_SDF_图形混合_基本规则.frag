#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359


float sdf_circle(vec2 p, float r) {
  return length(p) - r;
}

float sdf_rect(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}


void main() {
  // 维持纵横比
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * vec2(3.0, 2.0);
  float col = uv.x;
  float row = uv.y;
  uv = fract(uv);
  uv = uv * 2.0 - 1.0; // uv in [-1, 1]
  uv.x *= (u_resolution.x * 2.0) / (u_resolution.y * 3.0); // Aspect ratio
  

  vec3 color = vec3(1.0, 1.0, 1.0);

  // 圆
  float circle = sdf_circle(uv, 0.25);
  // 矩形
  float rect = sdf_rect(uv + vec2(0.3, 0.0), vec2(0.3, 0.15));

  // 最终形状
  float final_shape = 1.0;
  vec3 shape_color = vec3(0.2, 0.6, 0.9);


  // 
  

  final_shape = rect; 
  final_shape = max(circle, rect); // 两个图形相交
  final_shape = min(circle, rect); // 两个图形相加
  final_shape = max(-circle, rect); // 两个图形用右边减去左边的 b - a
  final_shape = max(circle, -rect); // 两个图形左边减去右边的 a - b
  final_shape = max(min(circle, rect), -max(circle, rect)); // 减去中间相交的内容


  // 左上方是开始点
  if(row > 1.0) {
    // 第一行第一列
    if( col <  1.0) {
      final_shape = 1.0; // 仅圆
    }
    // 第一行第二列
    else if( col < 2.0) {
      final_shape = max(circle, rect); // 两个图形相交
    }
    // 第一行第三列
    else {
      final_shape = min(circle, rect); // 两个图形相加
    }
  }
  else {
    // 第二行第一列
    if( col <  1.0) {
      final_shape = max(-circle, rect); // 两个图形用右边减去左边的 b - a
    }
    // 第二行第二列
    else if( col < 2.0) {
      final_shape = max(circle, -rect); // 两个图形左边减去右边的 a - b
    }
    // 第二行第三列
    else {
      final_shape = max(min(circle, rect), -max(circle, rect)); // 减去中间相交的内容
    }
  }
  
  final_shape = smoothstep(0.0, 0.01, final_shape);
  final_shape = 1.0 - final_shape; // 反转
  color = mix(color, shape_color, final_shape); // 绘制混合后的形状

  // 绘制最终的颜色
  gl_FragColor = vec4(color, 1.0);
}