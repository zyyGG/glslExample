#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 i_resolution = vec2(400.0, 400.0);

float random(vec2 _uv){
  return fract(sin(dot(_uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void point(inout vec3 color, vec2 pointCenter, float pointSize, vec3 pointColor){
  if(gl_FragCoord.x >= pointCenter.x - pointSize && gl_FragCoord.x < pointCenter.x + pointSize && gl_FragCoord.y >= pointCenter.y - pointSize && gl_FragCoord.y < pointCenter.y + pointSize){
    color = pow(sin(u_time * 10.0), 2.0) * pointColor;
  }
}

// 生成噪声
float noise(vec2 _uv){
  // 取得传入的uv坐标的整数值，根据前面的计算，这里uv范围大概是(0-10, 0-4)
  // 假如当前uv坐标是(0.8,0.1), 那么此时传进来的uv坐标就会是(1.0, 3.2)
  vec2 i_uv = floor(_uv);
  // 取得传入uv坐标的小数部分
  vec2 f_uv = fract(_uv);
  // 插值系数, 使得u 随着小数部分从0逐渐逼近1
  vec2 u = smoothstep(0.0, 1.0, f_uv); // 平滑插值
  // 其他用来插值的手写函数, 假如f_uv = (0.33, 0.22)
  // 3 - 2.0 * (0.33, 0.22) = 3 - (0.66,0.44) = (2.34, 2.56)
  // (0.33, 0.22) * (0.33, 0.22) = (0.1089, 0.0484)
  // (0.1089, 0.0484) * (2.34, 2.56) = (0.254, 0.123)
  // vec2 u = f_uv * f_uv * (3.0 - 2.0 * f_uv);
  // vec2 u = step(0.5, f_uv);

  // 这里分解公式
  // mix(a,b,c)
  // a = mix(random(i_uv + vec2(0.,0.)), random(i_uv + vec2(1.,0.)), u.x)
  // 这里的意思是将random(i_uv + vec2(0.,0.))和random(i_uv + vec2(1.,0.))进行线性插值, 也就是在这两个值之间进行插值
  // 这里的random使用的是求随机数，得到的是0.-1.0之间的值
  // 
  // b = mix(random(i_uv + vec2(0.,1.)), random(i_uv + vec2(1.,1.)), u.x)
  // 这里的意思是将random(i_uv + vec2(0.,1.))和random(i_uv + vec2(1.,1.))进行线性插值, 也就是在这两个值之间进行插值
  // c = u.y
  return mix(mix(random(i_uv + vec2(0.,0.)), random(i_uv + vec2(1.,0.)), u.x), mix(random(i_uv + vec2(0.,1.)), random(i_uv + vec2(1.,1.)), u.x), u.y);
}

mat2 rotate2d(float angle){
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float lines(in vec2 pos, float b){
  float scale = 10.0;
  pos *= scale;
  return smoothstep(0.0, 0.5 + b * 0.5, abs(sin(pos.x * 3.1415) + b * 2.0) * 0.5);
}

void invertBackground(inout vec3 color) {
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {
    color = vec3(1.0);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;
  vec3 color = vec3(0.0);

  // 这里翻转了uv的xy, 并且将其x轴放大10倍，y轴放大4倍
  // 翻转yx 是为了让等会的效果更好，比起xy的图片，yx会逆时针转90度
  // vec2 pos = uv.yx * vec2(10.0, 4.0);
  // 这个搭配无插值噪声能看到旋转的情况
  vec2 pos = uv * 5.0;

  // 这里夫hi并没有实际意义，因为接下来还是会擦掉数据
  float pattern = pos.y;

  // 这里通过pos生成了噪声信息
  // 通过rotate2d函数将pos进行旋转，旋转的角度是噪声值乘以PI
  // 这样可以让pos的值在0-1之间进行旋转
  pos = rotate2d(noise(pos)) * pos;
  // pos = noise(pos) * pos;

  pattern = lines(pos, 0.3);
  // pattern = lines(uv, 0.3);

  color = vec3(pattern);
  // color = vec3(rotate2d(noise(pos)));

  point(color, vec2(0.8, 0.1) * i_resolution, 2.0 , vec3(1.0, 0.0, 0.0));

  invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}