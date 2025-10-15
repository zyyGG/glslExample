var o=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

float random2d(vec2 coord){\r
  return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);\r
}

float noise1d(float v){\r
  return cos(v + cos(v * 90.1415) * 100.1415) * 0.5 + 0.5;\r
}\r

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  float scale = u_resolution.x / u_resolution.y;\r
  float count = 10.0;\r
  uv *= vec2(count * scale, count);\r
  vec2 iUv = floor(uv);\r
  vec2 fUv = fract(uv);\r
  float random = random2d(iUv);\r
  float noise = noise1d(random);\r
  vec3 color = vec3(noise);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{o as default};
