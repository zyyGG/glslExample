#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// 循环扰动效果
float random1d(float coord){
  return sin(coord * 12.9898) * sin(coord * 78.233);
}

// 震荡加剧效果
float random1d02(float coord){
  return sin(coord * 12.9898) * coord;
}

// fbm 分型布朗运动
float random1d03(float x){
  float y = sin(x * 1.17);
  y += sin(x * 2.1);
  y += sin(x * 1.72);
  y += sin(x * 2.21);
  y += sin(x * 5.57);
  y *= 0.4;
  return y;
}

float noise2d(vec2 coord){
  vec2 i = floor(coord);
  vec2 f = fract(coord);
  float a = random2d(i);
  float b = random2d(i + vec2(1.0, 0.0));
  float c = random2d(i + vec2(0.0, 1.0));
  float d = random2d(i + vec2(1.0, 1.0));
  
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}



void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0; // 转换坐标系范围
  uv *= vec2(u_resolution.x / u_resolution.y, 1.0); // 处理宽高比例
  // 使用噪声偏移
  // float noise = noise2d(uv * random1d(u_time / 50.0) * 20.0); // 噪声值
  // float noise = noise2d(uv * random1d02(u_time) * 20.0); // 震荡逐渐加剧
  float noise = noise2d(uv * random1d03(u_time / 10.0) * 20.0); // 分型布朗运动


  noise = noise * 0.6 + 0.4; // 防止部分区域太暗
  noise = noise * 2.0 - 1.0; // 将噪声值范围调整到[-1, 1]
  noise = noise * 0.01; // 调整噪声强度
  uv += noise; // 将噪声值添加到uv坐标上
  // 测试用
  // uv *= noise; // 将uv坐标放大
  
  // 定义颜色
  vec3 color = vec3(0.0, 0.0, 0.0); // 底色
  
  // 绘制边框矩形
  float rectWidth = 0.01; // 边框宽度

  vec2 rect1 = 1.0 - step(vec2(0.5, 0.5), abs(uv));
  vec2 rect2 = 1.0 - step(vec2(0.5 - rectWidth, 0.5 - rectWidth), abs(uv));
  vec2 rect = rect2.x * rect2.y - rect1; // 计算边框区域
  // 测试用
  // rect = rect1;
  

  // 绘制中心点
  vec2 center = vec2(0.0, 0.0);
  float dist = step(0.01, length(uv - center));
  color = mix(vec3(1.0, 1.0 , 1.0), color, dist);
  color = mix(color,vec3(1.0, 0.5, 0.0), rect.x * rect.y); // 边框
  
  gl_FragColor = vec4(color, 1.0);
}