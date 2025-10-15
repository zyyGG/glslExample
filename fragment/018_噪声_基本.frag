#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {
    color = vec3(1.0);
  }
}

float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;
  vec3 color = vec3(0.0);
  uv *= 4.0; 
  vec2 i_uv = floor(uv);
  vec2 f_uv = fract(uv);
  float result_1 = random2d(i_uv); // 对整数随机的值
  float result_2 = random2d(f_uv); // 对小数随机的值
  float result_3 = mix(random2d(i_uv), random2d(i_uv) + 1.0, f_uv.x * f_uv.y); // 线性插值
  float result_4 = mix(random2d(i_uv), random2d(i_uv) + 1.0, smoothstep(0.0, 1.0, f_uv.x * f_uv.y )); // 平滑插值
  vec2 u = f_uv * f_uv * (3.0 - 2.0 * f_uv); // 三次多项式函数
  float result_5 = mix(random2d(i_uv), random2d(i_uv) + 1.0, u.x * u.y); // 三次多项式插值

  // 
  // color = vec3(vec2(result_1), 1.0); // 基础像素效果
  // color = vec3(vec2(result_2), 1.0); // 小数的随机值
  // color = vec3(vec2(result_3), 1.0); // 线性高光
  // color = vec3(vec2(result_4), 1.0); // 平滑的高光
  color = vec3(vec2(result_5), 1.0); // 自定义的平滑效果

  invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}