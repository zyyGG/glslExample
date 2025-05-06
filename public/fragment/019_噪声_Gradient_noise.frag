#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 i_resolution=vec2(400.,400.);

vec2 random2(vec2 _uv){
  _uv=vec2(dot(_uv,vec2(127.1,311.7)),dot(_uv,vec2(269.5,183.3)));
  return-1.+2.*fract((sin(_uv)*43758.5453123));
}

void invertBackground(inout vec3 color){
  if(gl_FragCoord.x>i_resolution.x||gl_FragCoord.y>i_resolution.y){
    color=vec3(1.);
  }
}

void main(){
  vec2 uv=gl_FragCoord.xy/i_resolution.xy;
  vec3 color=vec3(0.);
  uv=uv*50.;
  vec2 i_uv=floor(uv);
  vec2 f_uv=fract(uv);
  // vec2 v2_random=random2(i_uv);
  vec2 u=smoothstep(0.,1.,f_uv);// 线性插值
  
  float result=mix(mix(dot(random2(i_uv+vec2(0.,0.)),f_uv-vec2(0.,0.)),
  dot(random2(i_uv+vec2(1.,0.)),f_uv-vec2(1.,0.)),u.x),
  mix(dot(random2(i_uv+vec2(0.,1.)),f_uv-vec2(0.,1.)),
  dot(random2(i_uv+vec2(1.,1.)),f_uv-vec2(1.,1.)),u.x),u.y);
  
  // color=vec3(v2_random.xy,0.);
  color = vec3(result) * 0.5 + 0.5;
  invertBackground(color);
  gl_FragColor=vec4(color,1.);
}