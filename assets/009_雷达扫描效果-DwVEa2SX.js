var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;

#define PI 3.14159265359

void main() {\r
  vec2 uv = gl_FragCoord.xy;\r
  uv -= u_resolution / 2.0;\r
  vec2 d = uv - uv / 2.0;\r
  float r = sqrt(dot(d, d));\r
  float theta = 90.0 * u_time;\r
  float radius = 130.0;\r
  vec3 color = vec3(0.0);\r
  if(r < radius) {\r
    
    vec2 p = radius * vec2(cos(theta * PI / 180.0), -sin(theta * PI / 180.0));\r
    float l = length(d - p * clamp(dot(d, p) / dot(p, p), 0.0, 1.0));\r
    

    
    float theta0 = mod(180.0 * atan(d.y, d.x) / PI + theta, 360.0);\r
    float gradient = clamp(1.0 - theta0 / 90.0, 0.0, 1.0);\r
    color += (1.0 - smoothstep(0.0, 2.0, l)) * vec3(0.35,0.76,0.83) + 0.5 * gradient * vec3(0.35,0.76,0.83);\r
  }else {\r
    color += vec3(0.0, 0.0, 0.0);\r
  }

  
  

  
  color += ((1.0 - smoothstep(mod(u_time * 20.0, 30.0) / 30.0 * radius - 1.0, mod(u_time * 20.0, 30.0) / 30.0 * radius + 1.0, r - 0.5)) - (1.0 - smoothstep(mod(u_time * 20.0, 30.0) / 30.0 * (radius - 10.0) - 1.0, mod(u_time * 20.0, 30.0) / 30.0 * radius + 1.0, r + 0.5))) * vec3(0.35,0.76,0.83);

  
  color += ((1.0 - step(5.0, r))) * vec3(0.35,0.76,0.83);\r
  color += ((1.0 - smoothstep(6.0, 7.0, r - 1.0)) - (1.0 - smoothstep(6.0, 7.0, r + 1.0))) * vec3(0.35,0.76,0.83);

  

  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
