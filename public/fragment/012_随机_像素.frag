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

float random(vec2 uv) {
  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 48965.43658);
}

void main() {
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;
  vec3 color = vec3(0.0);
  uv *= 20.0; // 这里放大画布，做出10x10的网格
  // 这一块是使用了整数部分，这样颜色在网格变化范围就是整数的0-1
  vec2 ipos = floor(uv);  // get the integer coords
  // 这里保留了小数部分，这样cell中的变化范围就是0-1
  vec2 fpos = fract(uv);  // get the fractional coords
  color = random(ipos) + color; // 超越的部分会被改为白色
  // color = vec3(fpos, 0.0) + color; 
  invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}