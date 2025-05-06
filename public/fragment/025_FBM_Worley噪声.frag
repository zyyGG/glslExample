#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 random2d(vec2 coord){
  return vec2(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453),
              fract(sin(dot(coord.yx, vec2(8.9899, 79.235))) * 85.8355));
}

// 柏林噪声
float noise2d(vec2 uv){
  vec2 iUv = floor(uv);
  vec2 fUv = fract(uv); // 范围永远是0-1

  float result = 1.0;

  for(int y = -1; y <= 1; y++){
    for(int x = -1; x <= 1; x++){
      vec2 offsetPoint = vec2(float(x), float(y)); // 计算偏移量
      vec2 randCount = random2d(iUv + offsetPoint); // 计算偏移后的随机点
      randCount = 0.5 + 0.5 * sin(6.2831*randCount); // 范围是[0, 1]
      vec2 diff = offsetPoint + randCount - fUv;
      result = min(result, length(diff)); // 计算最小距离
    }
  }

  return result;
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
  // noise = noise2d(uv * 3.0); // 不做fbm的噪声
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