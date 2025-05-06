#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {
    color = vec3(1.0);
  }
}

float rand(vec2 _uv){
  return fract(sin(dot(_uv.xy, vec2(12.9898, 75.233))) * 43759.5452);
}

float noise(vec2 _uv){
  vec2 i_uv = floor(_uv);
  vec2 f_uv = fract(_uv);
  // 四个系数
  float a = rand(i_uv);
  float b = rand(i_uv + vec2(1.0, 0.0));
  float c = rand(i_uv + vec2(0.0, 1.0));
  float d = rand(i_uv + vec2(1.0, 1.0));

  // 计算插值
  vec2 u = smoothstep(0.0, 1.0, f_uv); // 线性插值

  // 混合四个角落的颜色
  float result = mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;

  return result;
}

void main() {
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;
  vec3 color = vec3(0.0);
  uv = uv * 50.0;
  color = vec3(noise(uv));

  vec2 uv1 = fract(vec2(uv.x, uv.y));
  vec2 uv2 = vec2(uv.x * 0.33 + i_resolution.x * 0.33, uv.y);
  vec2 uv3 = vec2(uv.x * 0.33 + i_resolution.x * 0.66, uv.y);

  vec2 uv1_shape = smoothstep(0.0, 0.2, uv1) * smoothstep(0.0, 0.2, 1.0 - uv1);
  // color *= vec3(uv1_shape.x * uv1_shape.y);
  
  invertBackground(color);
  gl_FragColor = vec4(color, 1.0);
}