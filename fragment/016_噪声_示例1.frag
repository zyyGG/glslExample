#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random2d(vec2 coord){
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise1d(float v){
  return cos(v + cos(v * 90.1415) * 100.1415) * 0.5 + 0.5;
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float scale = u_resolution.x / u_resolution.y;
  float count = 10.0;
  uv *= vec2(count * scale, count);
  vec2 iUv = floor(uv);
  vec2 fUv = fract(uv);
  float random = random2d(iUv);
  float noise = noise1d(random);
  vec3 color = vec3(noise);
  gl_FragColor = vec4(color, 1.0);
}