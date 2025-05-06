
#ifdef GL_ES
precision mediump float;
#endif

#include "../common/common.glsl"

void main() {
   
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(sin(u_time) * 0.5 + 0.5);
  gl_FragColor = vec4(color, 1.0);
 
}