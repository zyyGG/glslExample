#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st - vec2(0.5);
    return 1.-smoothstep(_radius-0.01,
                         _radius+0.01,
                         dot(l,l)*10.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  // uv *= 3.0;
  uv *= (sin(u_time) + 1.0) * 2.5;
  uv = fract(uv);
  color = vec3(circle(uv, 0.5));
  gl_FragColor = vec4(color, 1.0);
}