#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

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
  vec3 color = vec3(1.0);
  // uv *= vec2(200.0, 400.0); // 微微的雪花效果
  // uv *= vec2(4000.0, 5000.0); // 雪花屏幕
  uv *= vec2(10.0, 10.0); // 车水马龙的效果
  // 这里x轴的速度是通过y轴来确定的， 这样每一个y轴都会获得一个属于自己的速度
  float random_speed = random2d(floor(vec2(0.0, uv.y))); 
  // 这里的随机方向，通过step转为0 - 1的值，再通过*2-1转为-1 - 1的值
  float random_direction = step(0.5, random_speed) * 2.0 - 1.0;
  // +10.0是保证基础速度不会特别慢
  // 这里最后* random_direction是为了让速度有正有负，形成一个来回的效果
  // 如果不想要来回效果, 可以pow(random_direction, 2.0)来让速度都是正的
  uv.x += u_time * (10.0 * random_speed + 10.0) * random_direction;
  float random_ipos = random2d(floor(uv));
  color = step(0.55, random_ipos) * color; // 超越的部分会被改为白色
  invertBackground(color);  
  gl_FragColor = vec4(color, 1.0);
}