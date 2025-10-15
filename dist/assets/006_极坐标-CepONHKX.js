var o=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

void main(){\r
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;\r
  \r
  vec2 pos = vec2(0.5) - uv; 
  float r = length(pos) * 2.0; 
  float a = atan(pos.y, pos.x); 
  \r
  float f = cos(a * mod(u_time, 24.0)); 
  \r
  vec3 color=vec3(1.-smoothstep(f , f + .02,r));
  \r
  gl_FragColor=vec4(color,1.);\r
}`;export{o as default};
