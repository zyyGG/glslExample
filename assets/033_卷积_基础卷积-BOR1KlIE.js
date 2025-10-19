var e=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;\r
uniform vec2 u_mouse;\r
uniform sampler2D u_texture_0;

vec3 applyConvolution(vec2 uv, vec2 tex_offset, sampler2D texture, float kernel[9]) {\r
  vec3 col = vec3(0.0);\r
  col += texture2D(texture, uv + vec2(-tex_offset.x, -tex_offset.y)).rgb * kernel[0];\r
  col += texture2D(texture, uv + vec2(0.0, -tex_offset.y)).rgb * kernel[1];\r
  col += texture2D(texture, uv + vec2(tex_offset.x, -tex_offset.y)).rgb * kernel[2];\r
  col += texture2D(texture, uv + vec2(-tex_offset.x, 0.0)).rgb * kernel[3];\r
  col += texture2D(texture, uv + vec2(0.0, 0.0)).rgb * kernel[4];\r
  col += texture2D(texture, uv + vec2(tex_offset.x, 0.0)).rgb * kernel[5];\r
  col += texture2D(texture, uv + vec2(-tex_offset.x, tex_offset.y)).rgb * kernel[6];\r
  col += texture2D(texture, uv + vec2(0.0, tex_offset.y)).rgb * kernel[7];\r
  col += texture2D(texture, uv + vec2(tex_offset.x, tex_offset.y)).rgb * kernel[8];\r
  return col;\r
}

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  vec4 texture_0 = texture2D(u_texture_0, uv);\r
  vec3 color = texture_0.rgb;

  \r
  float kernel[9];\r
  
  
  
  

  
  kernel[0] = 1.0/16.0;  kernel[1] = 2.0/16.0;  kernel[2] = 1.0/16.0;\r
  kernel[3] = 2.0/16.0;  kernel[4] = 4.0/16.0;  kernel[5] = 2.0/16.0;\r
  kernel[6] = 1.0/16.0;  kernel[7] = 2.0/16.0;  kernel[8] = 1.0/16.0;\r

  
  vec3 convColor_0 = applyConvolution(uv, vec2(1.0) / u_resolution.xy, u_texture_0, kernel);\r

  color = convColor_0;

  gl_FragColor = vec4(color, 1.0);\r
}`;export{e as default};
