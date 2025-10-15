#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 i_resolution = vec2(400.0, 400.0);

// void invertBackground(inout vec3 color) {
//   if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {
//     color = vec3(1.0);
//   }
// }

vec2 rotate2D(vec2 _uv, float _angle) {
  _uv -= 0.5;
  _uv *= mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
  _uv += 0.5;
  return _uv;
}

// 画矩形
float box(vec2 _uv){
  float size = 0.02;
  // smoothstep用来平滑边缘
  // vec2(_uv.x, _uv.y * 0.3) 搭配缩放规则，让矩形的y轴接缝处更加自然
  // 不需要的话可以还原成vec2(_uv) 也就是_uv本身
  vec2 l = smoothstep(size, size + 0.01, vec2(_uv.x * 0.3, _uv.y * 0.3)) * smoothstep(size, size + 0.01, vec2(1.0) - _uv);
  return l.x * l.y; // 这里的l.x和l.y是两个矩形的边缘
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  // uv / vec2(1.0 , 1.25) 用来缩放uv坐标，这里x,y 输入了一个矩形的缩放规则，x缩放2.5倍，y缩放1.25倍
  uv = uv / vec2(1.0 , 1.25);
  // 这里分割空间，将uv坐标分割成10*10的小格子， 搭配上上面的缩放规则，就有了砖块的感觉
  vec2 tiles = uv * vec2(50.0);
  // step(1.0, mod(tiles.y, 2.0)) 用来判断奇偶行， tiels.y % 2 == 0 ? 0 : 1
  // 最后的0.5是为了让奇数行向右移动一半
  tiles.x = tiles.x + step(1., mod(tiles.y, 2.0)) * 0.5;
  uv = fract(tiles); // 分割空间

  // uv = rotate2D(uv, u_time);
  color = box(uv) * vec3(1.0);

  // 确定颜色
  color *= vec3(1.0, 0.4745, 0.098);

  // invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}