#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void point(inout vec3 color, vec2 pointCenter, float pointSize, vec3 pointColor){
  if(gl_FragCoord.x >= pointCenter.x - pointSize && gl_FragCoord.x < pointCenter.x + pointSize && gl_FragCoord.y >= pointCenter.y - pointSize && gl_FragCoord.y < pointCenter.y + pointSize){
    color = pow(sin(u_time * 10.0), 2.0) * pointColor;
  }
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(1.0, 1.0, 1.0);
  // 画一个点
  point(color, vec2(65.0, 85.0), 5.0 , vec3(1.0, 0.0, 0.0));
  
  gl_FragColor = vec4(color, 1.0);
}


