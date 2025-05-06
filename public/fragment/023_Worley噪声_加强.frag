#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 random2d(vec2 coord){
  return vec2(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453),
              fract(sin(dot(coord.yx, vec2(12.9898, 78.233))) * 43758.5453));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y; // 计算缩放比例
  uv *= 3.0;
  vec2 iUv = floor(uv);
  vec2 fUv = fract(uv); // 范围永远是0-1
  // vec2 rand = random2d(iUv);

  // float min_dist = 1.0; // 最小距离，防止计算的边界出问题
  float time = u_time;
  float result = 1.0;
  
  for(int y = -1; y <= 1; y++){
    for(int x = -1; x <= 1; x++){
      // 临近元素的随机点
      vec2 offsetPoint = vec2(float(x), float(y)); // 计算偏移量
      // 获得随机中心点, 
      // 这里iUv计算的中心坐标点， + offsetPoint是偏移量，
      // 偏移量会随着循环遍历9次。
      vec2 rand = random2d(iUv + offsetPoint); // 计算偏移后的随机点
      rand = 0.5 + 0.5 * sin(time + 6.2831*rand); // 范围是[0, 1]
      vec2 diff = offsetPoint + rand - fUv; 
      // float dist = length(diff); // 计算向量到原点的距离
      // min_dist = min(min_dist, dist);
      result = min(result, length(diff)); // 计算最小距离
    }
  }
  vec3 color = vec3(0.0);
  color += result;
  // 绘制点位中心
  // color += 1.-step(.01, result);
  // 绘制grid
  // color.r += step(0.995, fUv.x) + step(0.995, fUv.y);

  // 显示距离场
  // color -= step(0.7 , abs(sin(36.0 * result))) * 0.5;

  gl_FragColor = vec4(color, 1.0);
}