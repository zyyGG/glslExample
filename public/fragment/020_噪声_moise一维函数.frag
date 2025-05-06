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

float noise1d(float v){
  // v *= 5.0;
  float i_v = floor(v);
  float f_v = fract(v);
  // return mix(sin(i_v),sin(i_v  + 1.0), f_v); // 线性插值
  return mix(sin(i_v),sin(i_v  + 1.0), smoothstep(0.0, 1.0, f_v)); // 平滑插值
}


void main() {
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;
  vec3 color = vec3(1.0);
  uv *= vec2(2.0, 2.0); // 放大画布，做出10x10的网格
  // float speed = (random2d(uv) * (noise1d(uv.x) * noise1d(uv.y))); // 随机的速度
  // color *= speed;
  color = vec3(noise1d(random2d(uv)));
  // color *= vec3(1.0, 0.3, 0.0);
  invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}