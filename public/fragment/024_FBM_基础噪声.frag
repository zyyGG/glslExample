#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// 柏林噪声
float noise2d(vec2 coord){
  vec2 i = floor(coord);
  vec2 f = fract(coord);
  float a = random2d(i);
  float b = random2d(i + vec2(1.0, 0.0));
  float c = random2d(i + vec2(0.0, 1.0));
  float d = random2d(i + vec2(1.0, 1.0));
  
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// fbm
float fbm (vec2 st){
  float f = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++){
    f += a * noise2d(st);
    // f += a * abs(noise2d(st));
    st *= 2.0;
    a *= 0.5;
  }
  return f;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0; // 转换坐标系范围
  uv *= vec2(u_resolution.x / u_resolution.y, 1.0); // 处理宽高比例
  float noise = fbm(uv * 3.0); // 噪声值
  float borderStrength = 0.03; // 边缘变形强度
  uv += (noise * 2.0 - 1.0) * borderStrength;
  // 绘制圆形
  float dist = length(uv - vec2(0.0)); // 距离
  vec3 color = vec3(0.0, 0.0, 0.0); // 底色
  color = mix(vec3(1.0, 0.5, 0.0), color, smoothstep(0.5, 0.51, dist)); // 圆形颜色
  // 显示噪声图
  color = mix(color, vec3(noise), 0.5);
  gl_FragColor = vec4(color, 1.0);
}