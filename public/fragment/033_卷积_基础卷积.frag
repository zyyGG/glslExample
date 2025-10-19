#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture_0;

// 3x3卷积函数
vec3 applyConvolution(vec2 uv, vec2 tex_offset, sampler2D texture, float kernel[9]) {
  vec3 col = vec3(0.0);
  col += texture2D(texture, uv + vec2(-tex_offset.x, -tex_offset.y)).rgb * kernel[0];
  col += texture2D(texture, uv + vec2(0.0, -tex_offset.y)).rgb * kernel[1];
  col += texture2D(texture, uv + vec2(tex_offset.x, -tex_offset.y)).rgb * kernel[2];
  col += texture2D(texture, uv + vec2(-tex_offset.x, 0.0)).rgb * kernel[3];
  col += texture2D(texture, uv + vec2(0.0, 0.0)).rgb * kernel[4];
  col += texture2D(texture, uv + vec2(tex_offset.x, 0.0)).rgb * kernel[5];
  col += texture2D(texture, uv + vec2(-tex_offset.x, tex_offset.y)).rgb * kernel[6];
  col += texture2D(texture, uv + vec2(0.0, tex_offset.y)).rgb * kernel[7];
  col += texture2D(texture, uv + vec2(tex_offset.x, tex_offset.y)).rgb * kernel[8];
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec4 texture_0 = texture2D(u_texture_0, uv);
  vec3 color = texture_0.rgb;

  
  float kernel[9];
  // 锐化
  // kernel[0] =  0.0;  kernel[1] = -1.0;  kernel[2] =  0.0;
  // kernel[3] = -1.0;  kernel[4] =  5.0;  kernel[5] = -1.0;
  // kernel[6] =  0.0;  kernel[7] = -1.0;  kernel[8] =  0.0;

  // 高斯模糊
  kernel[0] = 1.0/16.0;  kernel[1] = 2.0/16.0;  kernel[2] = 1.0/16.0;
  kernel[3] = 2.0/16.0;  kernel[4] = 4.0/16.0;  kernel[5] = 2.0/16.0;
  kernel[6] = 1.0/16.0;  kernel[7] = 2.0/16.0;  kernel[8] = 1.0/16.0;


  // 应用卷积核
  vec3 convColor_0 = applyConvolution(uv, vec2(1.0) / u_resolution.xy, u_texture_0, kernel);


  color = convColor_0;

  gl_FragColor = vec4(color, 1.0);
}