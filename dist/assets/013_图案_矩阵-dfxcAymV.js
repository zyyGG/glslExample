var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

#define PI 3.14159265359

vec2 i_resolution = vec2(400.0, 400.0);

void invertBackground(inout vec3 color) {\r
  if(gl_FragCoord.x > i_resolution.x || gl_FragCoord.y > i_resolution.y) {\r
    color = vec3(1.0);\r
  }\r
}

vec2 tile(vec2 _uv, float _repeat) {\r
  return fract(_uv * _repeat);\r
}

vec2 rotate2D(vec2 uv, float _angle) {\r
  uv -= 0.5;\r
  uv = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * uv;\r
  uv += 0.5;\r
  return uv;\r
}

float box(vec2 _st){\r
    vec2 _size = vec2(0.15);\r
    vec2 uv = smoothstep(_size, _size+0.01, _st) * smoothstep(_size, _size+0.01, vec2(1.0) - _st);\r
    return uv.x*uv.y;\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / i_resolution.xy;\r
  vec3 color = vec3(0.0);

  uv = tile(uv, 97.0);

  
  uv = rotate2D(uv, PI * fract(u_time / 10.0));

  
  color += vec3(box(uv)) * vec3(0.0, 0.3882, 0.6824);

  invertBackground(color);\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
