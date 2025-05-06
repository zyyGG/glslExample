#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 random2d(vec2 coord){
  return vec2(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453),
              fract(sin(dot(coord.yx, vec2(12.9898, 78.233))) * 43758.5453));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float scale = u_resolution.x / u_resolution.y; // 计算缩放比例
  uv *= vec2(scale, 1.0);
  uv *= 3.0;
  vec2 iUv = floor(uv);
  vec2 fUv = fract(uv); // 范围永远是0-1
  vec2 rand = random2d(iUv);
  
  vec2 diff = rand - fUv; // 这里的diff是一个向量，表示随机点和uv之间的差值, xy范围都是[-0.5, 0.5]
  float dist = length(diff); // 计算向量到原点的距离


  gl_FragColor = vec4(vec3(dist), 1.0);
}