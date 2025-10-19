var n=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;\r
uniform vec2 u_mouse;\r
uniform sampler2D u_texture_0;

float gray(vec3 color) {\r
  return dot(color, vec3(0.299, 0.587, 0.114));\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  
  vec4 original_texture_0 = texture2D(u_texture_0, uv); 

  float kernel_gassian[9];\r
  
  kernel_gassian[0] = 1.0/16.0;  kernel_gassian[1] = 2.0/16.0;  kernel_gassian[2] = 1.0/16.0;\r
  kernel_gassian[3] = 2.0/16.0;  kernel_gassian[4] = 4.0/16.0;  kernel_gassian[5] = 2.0/16.0;\r
  kernel_gassian[6] = 1.0/16.0;  kernel_gassian[7] = 2.0/16.0;  kernel_gassian[8] = 1.0/16.0;

  float kernel_x[9];\r
  
  kernel_x[0] =  -1.0;  kernel_x[1] =  0.0;  kernel_x[2] =  1.0;\r
  kernel_x[3] =  -2.0;  kernel_x[4] = 0.0;  kernel_x[5] =  2.0;\r
  kernel_x[6] =  -1.0;  kernel_x[7] =  0.0;  kernel_x[8] =  1.0;

  float kernel_y[9];\r
  
  kernel_y[0] =  1.0;  kernel_y[1] =  2.0;  kernel_y[2] =  1.0;\r
  kernel_y[3] =  0.0;  kernel_y[4] = 0.0;  kernel_y[5] =  0.0;\r
  kernel_y[6] =  -1.0;  kernel_y[7] =  -2.0;  kernel_y[8] =  -1.0;

  
  vec2 off[9];\r
  off[0] = vec2(-1.0, -1.0) / u_resolution.xy;\r
  off[1] = vec2(0.0, -1.0) / u_resolution.xy;\r
  off[2] = vec2(1.0, -1.0) / u_resolution.xy;\r
  off[3] = vec2(-1.0, 0.0) / u_resolution.xy;\r
  off[4] = vec2(0.0, 0.0) / u_resolution.xy;\r
  off[5] = vec2(1.0, 0.0) / u_resolution.xy;\r
  off[6] = vec2(-1.0, 1.0) / u_resolution.xy;\r
  off[7] = vec2(0.0, 1.0) / u_resolution.xy;\r
  off[8] = vec2(1.0, 1.0) / u_resolution.xy;

  
  float blurredN[9];\r
  for (int i = 0; i < 9; i++) {\r
    float b = 0.0;\r
    
    for (int k = 0; k < 9; k++) {\r
      vec2 sampleUV = uv + off[i] + off[k];\r
      b += gray(texture2D(u_texture_0, sampleUV).rgb) * kernel_gassian[k];\r
    }\r
    blurredN[i] = b;\r
  }

  
  float sx = 0.0;\r
  float sy = 0.0;\r
  for (int i = 0; i < 9; i++) {\r
    sx += blurredN[i] * kernel_x[i];\r
    sy += blurredN[i] * kernel_y[i];\r
  }

  float mag = length(vec2(sx, sy));

  vec3 outColor = vec3(mag);

  \r
  
  vec3 color = mix(outColor, original_texture_0.rgb, step(u_mouse.x / u_resolution.x, uv.x)); 
  gl_FragColor = vec4(color, 1.0);\r
}`;export{n as default};
