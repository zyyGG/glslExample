var r=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

float circle(in vec2 _st, in float _radius){\r
    vec2 l = _st - vec2(0.5);\r
    return 1.-smoothstep(_radius-0.01,\r
                         _radius+0.01,\r
                         dot(l,l)*10.0);\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  vec3 color = vec3(0.0);\r
  
  uv *= (sin(u_time) + 1.0) * 2.5;\r
  uv = fract(uv);\r
  color = vec3(circle(uv, 0.5));\r
  gl_FragColor = vec4(color, 1.0);\r
}`;export{r as default};
