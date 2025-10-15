#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture_0;

float sdf_circle(vec2 p, float r) {
  return length(p) - r;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float texture_scale = 2.0; // 纹理缩放比例 
  float offset = 1.0 / (texture_scale * 2.0); // 纹理偏移量
  uv = uv * 2.0 - 1.0;
  uv.x *= (u_resolution.x) / (u_resolution.y); // Aspect ratio
  vec2 circle_offset = u_mouse.xy / u_resolution.xy * 2.0 - 1.0; // 圆形偏移量
  circle_offset.x *= (u_resolution.x) / (u_resolution.y); // Aspect ratio

  // 先使用当前uv坐标画一个居中圆形
  float circle = sdf_circle(uv - circle_offset, .1);
  vec3 ciecle_color = vec3(0.8118, 0.1098, 0.9882);


  uv = uv + vec2(offset); // 图片居中对齐
  vec2 texture_uv = uv * texture_scale; // 采样坐标
  vec4 texture_0 = texture2D(u_texture_0, texture_uv);
  vec3 color = vec3(1.0);
  // 切割图片
  float pics_range = (uv.x < (uv.x / texture_uv.x) ? 1.0 : 0.0) * 
  (uv.y < (uv.y / texture_uv.y) ? 1.0 : 0.0) * 
  (uv.x > ((uv.x - texture_scale) / texture_uv.x) ? 1.0 : 0.0) * 
  (uv.y > ((uv.y - texture_scale) / texture_uv.y) ? 1.0 : 0.0);

  float final_shape = 1.0;

  // 让圆形边缘变得柔和一些
  circle = smoothstep(0.0, 0.1, circle);

  
  // color = mix(color, texture_0.rgb, pics_range); // 只显示图片
  // color = mix(color, ciecle_color, 1.0-circle); // 只显示圆形


  // final_shape = pics_range - circle; // 鼠标移过的时候展示范围内的图片
  // final_shape = pics_range ; // 鼠标移过的时候遮罩范围内的图片
  // color = mix(color, texture_0.rgb, final_shape);

  // 第一个效果 圆形挖空图片的效果
  color = mix(color, texture_0.rgb, pics_range); // 先显示图片
  // 此时的图片是切割完成的，其余空间都是背景色白色
  // 让圆形成为遮罩，被遮住的地方显示背景色
  color = mix(color, vec3(1.0), 1.0 - circle); // 鼠标移过的时候显示白色圆形

  // 第二个效果 圆形成为蒙版
  // color = mix(color, texture_0.rgb, pics_range); // 先显示图片
  // color = mix(vec3(1.0), color, 1.0 - circle);

  
  
  // 其他的代码可以放到这里

  gl_FragColor = vec4(color, 1.0);
}