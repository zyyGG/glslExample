#include "../common/common.glsl"

float random2d(vec2 uv){
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 uv) {
  vec2 i = floor(uv);
  vec2 f = fract(uv);
  float a = random2d(i + vec2(0.0, 0.0));
  float b = random2d(i + vec2(1.0, 0.0));
  float c = random2d(i + vec2(0.0, 1.0));
  float d = random2d(i + vec2(1.0, 1.0));
  
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 uv) {
  float f = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    f += a * noise(uv);
    uv *= 2.0;
    a *= 0.5;
  }
  return f;
}

void main() {
  // 实现的逻辑思考
  // 首先是需要指定溶解的边缘颜色
  // 得到噪声图，通过噪声图来决定当前片元是否需要溶解
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0; // Normalize to [-1, 1]
  uv = uv * vec2(u_resolution.x / u_resolution.y, 1.0); // Aspect ratio correction
  float noiseStress = 3.0; // 噪声强度
  float noiseValue = noise(uv * noiseStress); // 使用3.0的噪声效果
  // 使用fbm
  noiseValue = fbm(uv * noiseStress ); // 使用fbm噪声
  vec3 color = vec3(1.0, 0.0, 0.0); // 未溶解的颜色
  vec3 edgeColor = vec3(0.0, 1.0, 0.0); // 溶解中的边缘颜色
  float edge = smoothstep(0.0, noiseValue, mod(u_time / 5.0, 1.0)); // 计算溶解的插值
  color = mix(color, edgeColor , edge); // 混合颜色
  // circle = mix(noiseValue, circle, (sin(u_time) * 0.5 + 0.5)); // 圆的颜色由噪声决定
  // color += 1.0 * vec3(noiseValue);
  // color = mix(color, vec3(noiseValue), sin(u_time) * 0.5 + 0.5);
  gl_FragColor = vec4(color, 1.0 - edge); // 透明度由强度决定
}