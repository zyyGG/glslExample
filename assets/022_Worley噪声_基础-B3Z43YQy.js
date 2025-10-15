var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec2 random2d(vec2 coord){\r
  return vec2(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453),\r
              fract(sin(dot(coord.yx, vec2(12.9898, 78.233))) * 43758.5453));\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  float scale = u_resolution.x / u_resolution.y; 
  uv *= vec2(scale, 1.0);\r
  uv *= 3.0;\r
  vec2 iUv = floor(uv);\r
  vec2 fUv = fract(uv); 
  vec2 rand = random2d(iUv);\r
  \r
  vec2 diff = rand - fUv; 
  float dist = length(diff); \r

  gl_FragColor = vec4(vec3(dist), 1.0);\r
}`;export{n as default};
