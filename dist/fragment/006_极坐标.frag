#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  
  vec2 pos = vec2(0.5) - uv; // 0.5 是中心点, -uv 是为了让中心点在屏幕中心
  float r = length(pos) * 2.0; // 通过length来计算距离， * 2 是为了放大图像
  float a = atan(pos.y, pos.x); // 通过atan来计算角度, 范围是-PI到PI
  
  float f = cos(a * mod(u_time, 24.0)); // 通过cos来计算角度
  
  vec3 color=vec3(1.-smoothstep(f , f + .02,r));// 0.005 边缘柔化(抗锯齿)
  
  gl_FragColor=vec4(color,1.);
}