#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {
    color = vec3(1.0);
  }
}

vec2 tile(vec2 _uv, float _repeat) {
  return fract(_uv * _repeat);
}

vec2 rotate2D(vec2 uv, float _angle) {
  uv -= 0.5;
  uv = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * uv;
  uv += 0.5;
  return uv;
}

float box(vec2 _st){
    vec2 _size = vec2(0.15);
    vec2 uv = smoothstep(_size, _size+0.01, _st) * smoothstep(_size, _size+0.01, vec2(1.0) - _st);
    return uv.x*uv.y;
}

void main() {
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;
  vec3 color = vec3(0.0);

  uv = tile(uv, 97.0);

  // 旋转
  uv = rotate2D(uv, PI * fract(u_time / 10.0));

  // 绘制方块
  color += vec3(box(uv)) * vec3(0.0, 0.3882, 0.6824);

  invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}