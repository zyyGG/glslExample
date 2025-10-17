#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture_0;
uniform float u_mouse;

// 参考：
// #reference: https://iquilezles.org/articles/distfunctions2d/

// 六边形
float sdHexagon( in vec2 p, in float r )
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy,p),0.0) * k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

float draw_texture_01(){
  float cols = 14.0;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * vec2(cols, cols * (u_resolution.y / u_resolution.x));
  uv = fract(uv);
  
  float hexagon = sdHexagon(uv - vec2(0.5), 0.4);
  hexagon = smoothstep(0.01, 0.04, abs(hexagon));
  return hexagon;
}


float draw_texture_02(vec2 uv){
  float cols = 20.0;
  float border = 0.2;
  uv = uv * vec2(cols, cols * (u_resolution.y / u_resolution.x));
  uv = fract(uv);
  // uv *= scale;
  // float line = min( fract(uv.x * scale), fract(uv.y * scale) );
  float line = smoothstep(0.0, border, uv.x) * 
                smoothstep(0.0, border, uv.y) * 
                smoothstep(0.0, border, 1.0 - uv.x) * 
                smoothstep(0.0, border, 1.0 - uv.y);
  return 1.0 - line;
}

// 噪声
vec2 random2d(vec2 coord){
  return vec2(fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453),
              fract(sin(dot(coord.yx, vec2(8.9899, 79.235))) * 85.8355));
}

float noise2d(vec2 uv){
  vec2 iUv = floor(uv);
  vec2 fUv = fract(uv); // 范围永远是0-1

  float result = 1.0;

  for(int y = -1; y <= 1; y++){
    for(int x = -1; x <= 1; x++){
      vec2 offsetPoint = vec2(float(x), float(y)); // 计算偏移量
      vec2 randCount = random2d(iUv + offsetPoint); // 计算偏移后的随机点
      randCount = 0.5 + 0.5 * sin(6.2831*randCount); // 范围是[0, 1]
      vec2 diff = offsetPoint + randCount - fUv;
      result = min(result, length(diff)); // 计算最小距离
    }
  }

  return result;
}

// fbm
float fbm (vec2 st){
  float f = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++){
    f += a * noise2d(st);
    // f += a * abs(noise2d(st));
    st *= 2.0;
    a *= 0.5;
  }
  return f;
}


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  vec3 bgColor = color;
  float hexagon = 1.0 - draw_texture_01(); // 1.0 是图案，0.0是背景
  float noise = fbm(uv * 1.0);
  float grid = draw_texture_02(uv * noise + vec2(u_time / 100.0, u_time / 80.0));
  
  // grid *= noise;
  // color = mix(color, vec3(0.0), grid);
  vec3 patternColor = mix(vec3(0.2, 0.6, 1.0), vec3(1.0, 0.0, 0.0), grid);
  color = mix(color, patternColor, hexagon);
  
  

  // 对当前效果再做一次中心减淡，边缘加强
  // color = mix(bgColor, color, length(uv - 0.5) * 0.8 + 0.2);
  // color = mix(color, gridColor, grid);
  // color = vec3();
  gl_FragColor = vec4(color, 1.0);
}