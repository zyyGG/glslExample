var r=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec2 i_resolution=vec2(400.,400.);

vec2 random2(vec2 _uv){\r
  _uv=vec2(dot(_uv,vec2(127.1,311.7)),dot(_uv,vec2(269.5,183.3)));\r
  return-1.+2.*fract((sin(_uv)*43758.5453123));\r
}

void invertBackground(inout vec3 color){\r
  if(gl_FragCoord.x>i_resolution.x||gl_FragCoord.y>i_resolution.y){\r
    color=vec3(1.);\r
  }\r
}

void main(){\r
  vec2 uv=gl_FragCoord.xy/i_resolution.xy;\r
  vec3 color=vec3(0.);\r
  uv=uv*50.;\r
  vec2 i_uv=floor(uv);\r
  vec2 f_uv=fract(uv);\r
  
  vec2 u=smoothstep(0.,1.,f_uv);
  \r
  float result=mix(mix(dot(random2(i_uv+vec2(0.,0.)),f_uv-vec2(0.,0.)),\r
  dot(random2(i_uv+vec2(1.,0.)),f_uv-vec2(1.,0.)),u.x),\r
  mix(dot(random2(i_uv+vec2(0.,1.)),f_uv-vec2(0.,1.)),\r
  dot(random2(i_uv+vec2(1.,1.)),f_uv-vec2(1.,1.)),u.x),u.y);\r
  \r
  
  color = vec3(result) * 0.5 + 0.5;\r
  invertBackground(color);\r
  gl_FragColor=vec4(color,1.);\r
}`;export{r as default};
