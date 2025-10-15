var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

vec2 i_resolution = vec2(400.0, 400.0);\r

vec2 rotate2D(vec2 _uv, float _angle) {\r
  _uv -= 0.5;\r
  _uv *= mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));\r
  _uv += 0.5;\r
  return _uv;\r
}

float box(vec2 _uv){\r
  float size = 0.02;\r
  
  
  
  vec2 l = smoothstep(size, size + 0.01, vec2(_uv.x * 0.3, _uv.y * 0.3)) * smoothstep(size, size + 0.01, vec2(1.0) - _uv);\r
  return l.x * l.y; 
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  vec3 color = vec3(0.0);\r
  
  uv = uv / vec2(1.0 , 1.25);\r
  
  vec2 tiles = uv * vec2(50.0);\r
  
  
  tiles.x = tiles.x + step(1., mod(tiles.y, 2.0)) * 0.5;\r
  uv = fract(tiles); 

  
  color = box(uv) * vec3(1.0);

  
  color *= vec3(1.0, 0.4745, 0.098);

  
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
