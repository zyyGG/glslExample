#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture_0;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float texture_scale = 2.0; // 纹理缩放比例 
  float offset = 1.0 / (texture_scale * 2.0); // 纹理偏移量
  uv = uv * 2.0 - 1.0 + vec2(offset); // 居中对齐
  vec2 texture_uv = uv * texture_scale;
  vec4 texture_0 = texture2D(u_texture_0, texture_uv);
  vec3 color = vec3(1.0);
  // 切割图片
  float pics_range = (uv.x < (uv.x / texture_uv.x) ? 1.0 : 0.0) * 
  (uv.y < (uv.y / texture_uv.y) ? 1.0 : 0.0) * 
  (uv.x > ((uv.x - texture_scale) / texture_uv.x) ? 1.0 : 0.0) * 
  (uv.y > ((uv.y - texture_scale) / texture_uv.y) ? 1.0 : 0.0);

  // 加入texture_0图片纹理
  color = mix(color, texture_0.rgb, pics_range);

  // 其他的代码可以放到这里

  gl_FragColor = vec4(color, 1.0);
}