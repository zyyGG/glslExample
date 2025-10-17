var e=`#ifdef GL_ES\r
precision mediump float;\r
#endif

uniform vec2 u_resolution;\r
uniform float u_time;\r
uniform sampler2D u_texture_0;

void main() {\r
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\r
  float texture_scale = 2.0; 
  float offset = 1.0 / (texture_scale * 2.0); 
  uv = uv * 2.0 - 1.0 + vec2(offset); 
  vec2 texture_uv = uv * texture_scale;\r
  vec4 texture_0 = texture2D(u_texture_0, texture_uv);\r
  vec3 color = vec3(1.0);\r
  
  float pics_range = (uv.x < (uv.x / texture_uv.x) ? 1.0 : 0.0) * \r
  (uv.y < (uv.y / texture_uv.y) ? 1.0 : 0.0) * \r
  (uv.x > ((uv.x - texture_scale) / texture_uv.x) ? 1.0 : 0.0) * \r
  (uv.y > ((uv.y - texture_scale) / texture_uv.y) ? 1.0 : 0.0);

  
  color = mix(color, texture_0.rgb, pics_range);

  

  gl_FragColor = vec4(color, 1.0);\r
}`;export{e as default};
