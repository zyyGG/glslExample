#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {
    color = vec3(1.0);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy;
  vec3 color = vec3(0.0);
  uv -= u_resolution / 2.0;

  float r = length(uv - uv / 2.0);

  // 绘制两个圆环
  color += ((1.0 - smoothstep(30.0, 31.0, r - 0.5)) - (1.0 - smoothstep(30.0, 31.0, r + 0.5))) * vec3(0.35,0.76,0.83);
  color += ((1.0 - smoothstep(44.0, 45.0, r - 0.5)) - (1.0 - smoothstep(44.0, 45.0, r + 0.5))) * vec3(0.35,0.76,0.83);

  // 中心圆圆环
  color += ((1.0 - step(2.0, r))) * vec3(sin(u_time * 10.0) * 0.8, sin(u_time * 10.0) * 0.3, 0.0);
  color += ((1.0 - smoothstep(3.0, 4.0, r - 0.5)) - (1.0 - smoothstep(3.0, 4.0, r + 0.5))) * vec3(1.0, 0.3, 0.0);

  // 扩张圆环
  color += ((1.0 - smoothstep(mod(u_time * 20.0, 30.0) / 30.0 * 80.0 - 1.0, mod(u_time * 20.0, 30.0) / 30.0 * 80.0 + 1.0, r - 0.5)) - (1.0 - smoothstep(mod(u_time * 20.0, 30.0) / 30.0 * (80.0 - 20.0) - 1.0, mod(u_time * 20.0, 30.0) / 30.0 * 80.0 + 1.0, r + 0.5))) * vec3(1.0, 0.3, 0.0);

  // 绘制一半圆环
  
  // invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}