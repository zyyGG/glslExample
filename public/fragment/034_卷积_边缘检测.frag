#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture_0;

float gray(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // vec4 texture_0 = texture2D(u_texture_0, uv); // 采样
  vec4 original_texture_0 = texture2D(u_texture_0, uv); // 保留一个原始图像

  float kernel_gassian[9];
  // 高斯模糊
  kernel_gassian[0] = 1.0/16.0;  kernel_gassian[1] = 2.0/16.0;  kernel_gassian[2] = 1.0/16.0;
  kernel_gassian[3] = 2.0/16.0;  kernel_gassian[4] = 4.0/16.0;  kernel_gassian[5] = 2.0/16.0;
  kernel_gassian[6] = 1.0/16.0;  kernel_gassian[7] = 2.0/16.0;  kernel_gassian[8] = 1.0/16.0;

  float kernel_x[9];
  // 边缘检测 x方向
  kernel_x[0] =  -1.0;  kernel_x[1] =  0.0;  kernel_x[2] =  1.0;
  kernel_x[3] =  -2.0;  kernel_x[4] = 0.0;  kernel_x[5] =  2.0;
  kernel_x[6] =  -1.0;  kernel_x[7] =  0.0;  kernel_x[8] =  1.0;

  float kernel_y[9];
  // 边缘检测 y方向
  kernel_y[0] =  1.0;  kernel_y[1] =  2.0;  kernel_y[2] =  1.0;
  kernel_y[3] =  0.0;  kernel_y[4] = 0.0;  kernel_y[5] =  0.0;
  kernel_y[6] =  -1.0;  kernel_y[7] =  -2.0;  kernel_y[8] =  -1.0;

  // 定义 3x3 偏移
  vec2 off[9];
  off[0] = vec2(-1.0, -1.0) / u_resolution.xy;
  off[1] = vec2(0.0, -1.0) / u_resolution.xy;
  off[2] = vec2(1.0, -1.0) / u_resolution.xy;
  off[3] = vec2(-1.0, 0.0) / u_resolution.xy;
  off[4] = vec2(0.0, 0.0) / u_resolution.xy;
  off[5] = vec2(1.0, 0.0) / u_resolution.xy;
  off[6] = vec2(-1.0, 1.0) / u_resolution.xy;
  off[7] = vec2(0.0, 1.0) / u_resolution.xy;
  off[8] = vec2(1.0, 1.0) / u_resolution.xy;

  // 为每个邻域位置计算模糊值（9 个值）
  float blurredN[9];
  for (int i = 0; i < 9; i++) {
    float b = 0.0;
    // 对第 i 个位置应用 3x3 高斯核（以该位置为中心）
    for (int k = 0; k < 9; k++) {
      vec2 sampleUV = uv + off[i] + off[k];
      b += gray(texture2D(u_texture_0, sampleUV).rgb) * kernel_gassian[k];
    }
    blurredN[i] = b;
  }

  // 在模糊后的邻域上应用 Sobel
  float sx = 0.0;
  float sy = 0.0;
  for (int i = 0; i < 9; i++) {
    sx += blurredN[i] * kernel_x[i];
    sy += blurredN[i] * kernel_y[i];
  }

  float mag = length(vec2(sx, sy));

  vec3 outColor = vec3(mag);

  
  // 左半边显示处理结果，右半边显示原图
  vec3 color = mix(outColor, original_texture_0.rgb, step(u_mouse.x / u_resolution.x, uv.x)); // step 返回 float，转换为 vec3
  gl_FragColor = vec4(color, 1.0);
}