#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
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

  // 使用噪声偏移
  float noise = noise2d(uv * 20.0); // 噪声值
  noise = noise * 0.6 + 0.4; // 防止部分区域太暗
  // 测试用
  // color += noise;
  rect *= noise; // 根据噪声值调整边框透明度

  color = mix(color,vec3(1.0, 0.5, 0.0), rect.x * rect.y); // 边框
  
  gl_FragColor = vec4(color, 1.0);
}