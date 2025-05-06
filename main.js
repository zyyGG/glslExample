import "./src/assets/style.css";
const fileObject = import.meta.glob("./public/fragment/**");
// 获取所有的fileObject
function getFileList() {
  const list = [];
  for (const key in fileObject) {
    const element = fileObject[key];
    // 匹配shader文件
    if (/\.(frag|glsl)$/.test(element.name)) {
      const filePath = element.name.replace(/^(\.\/public)/, "");
      const fileName = filePath.split("/").pop().split(".")[0];
      list.push({
        name: fileName,
        path: filePath,
        img: `/images/${fileName}.png`,
      });
    }
  }
  return list;
}

function createExampleListElement(list) {
  const exampleList = document.querySelector(".example-list");
  exampleList.innerHTML = ""; // 清空列表
  list.forEach((item) => {
    const exampleItem = document.createElement("div");
    exampleItem.className = "example-item";
    exampleItem.innerHTML = `
      <img class="item-image" src="${item.img}" alt="Vite Logo" class="logo" onError="this.src='break.svg'" />
      <div class="item-title" title="${item.name}">${item.name}</div>
    `;
    exampleItem.addEventListener("click", () => { handleClick(item) });
    exampleList.appendChild(exampleItem);
  });
}

createExampleListElement(getFileList());

class Canvas {
  gl = null;
  canvas = null;
  canvasContainer = null;
  width = 0;
  height = 0;
  program = null;
  uniforms;
  #uniforms = {};
  attribute;
  #attribute = {};
  size = 2;
  vertexShader = `
  attribute vec2 a_position;

  void main() {
    vec2 zeroToOne = a_position;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace, 0.0, 1.0);
  }
  `;
  fragmentShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec2 u_resolution;
  uniform float u_time;
  
  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = 0.5 + 0.5*cos(u_time + st.xyx + vec3(0,2,4));
    gl_FragColor = vec4(color, 1.0);
  }
  `;
  constructor(options) {
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = document.createElement("canvas");
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.canvas.style.backgroundColor = "#000"; // 背景色

    this.canvasContainer.appendChild(this.canvas);
    // 初始化gl
    this.gl = this.canvas.getContext("webgl2");
    if (!this.gl) {
      console.error("WebGL not supported, falling back on experimental-webgl");
      this.gl = this.canvas.getContext("experimental-webgl");
    }
    if (!this.gl) {
      alert("Your browser does not support WebGL");
    }

    options = options || {};
    this.vertexShader = options.vertexShader || this.vertexShader;
    this.fragmentShader = options.fragmentShader || this.fragmentShader;
    this.#init();
    // this.uniforms = options.uniforms || this.uniforms;
    // this.draw(true)
    

    // window增加onsize处理
    window.addEventListener("resize", () => {
      this.width = this.canvasContainer.clientWidth;
      this.height = this.canvasContainer.clientHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.width = this.width + "px";
      this.canvas.style.height = this.height + "px";
      this.gl.viewport(0, 0, this.width, this.height);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    });
  }

  #init() {
    // 设置清除颜色
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 清除颜色缓冲区
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // 设置视口
    this.gl.viewport(0, 0, this.width, this.height);

    // 设置program
    const vertexShader = this.#createShader(
      this.gl.VERTEX_SHADER,
      this.vertexShader
    );
    const fragmentShader = this.#createShader(
      this.gl.FRAGMENT_SHADER,
      this.fragmentShader
    );
    this.program = this.#createProgram(vertexShader, fragmentShader);
    this.gl.useProgram(this.program);

    
    // 创建uniforms
    this.uniforms = new Proxy(this.#uniforms, {
      set: (target, prop, value) => {
        Object.defineProperty(value, "value", {
          get: () => { return value._value },
          set: (newValue) => {
            value._value = newValue;
            this.gl[`uniform${value.type}`](this.gl.getUniformLocation(this.program, prop), value._value);
          }
        })
        this.gl[`uniform${value.type}`](this.gl.getUniformLocation(this.program, prop), value._value);
        return Reflect.set(target, prop, value);
      },
      get: (target, prop) => {
        return Reflect.get(target, prop);
      }
    });
    // 设置默认值
    this.uniforms.u_resolution = {
      type: "2fv",
      _value: [this.width, this.height],
    };
    this.uniforms.u_time = {
      type: "1f",
      _value: 0,
    };
    this.uniforms.u_mouse = {
      type: "2fv",
      _value: [0, 0],
    };
    // 创建缓冲区
    const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position")
    this.gl.enableVertexAttribArray(positionAttributeLocation) // 启用缓冲区
    const positionBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer) // 绑定缓冲区
    const position = new Float32Array([
      0 + this.width,0,
      0, 0,
      0, 0 + this.height,
      0 + this.width,0,
      0, 0 + this.height,
      0 + this.width,0 + this.height,
    ]) // 创建矩形
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(position), this.gl.STATIC_DRAW) // 将数据传入缓冲区 
    this.size = 2
    this.gl.vertexAttribPointer(positionAttributeLocation, this.size, this.gl.FLOAT, false, 0, 0) // 传入数据
  }

  #createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.error(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }
  #createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    return program;
  }

  // 绘制
  draw(clear = false){
    if(clear){
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.gl.clearColor(1.0, 0.0, 0.0, 1.0);
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6); // 绘制
  }

  destory(){
    this.gl.deleteProgram(this.program);
    if(this.canvas){
      document.querySelector(".canvas-container")?.removeChild(this.canvas);
    }
  }
}



let canvas = new Canvas();
let prevTimestamp = 0;
function render(timestamp){
  if (prevTimestamp) {
    const deltaTime = (timestamp - prevTimestamp) / 1200;
    canvas.uniforms.u_time.value += deltaTime;
  }
  requestAnimationFrame(render);
  canvas.draw();
  prevTimestamp = timestamp;
}
render(0);

// 处理点击事件
async function handleClick(item){
  canvas.destory();
  let fragmentShader = await fetch(item.path).then(res => res.text());
  fragmentShader = await handleInclude(fragmentShader)

  canvas = new Canvas({
    fragmentShader,
  });

  // url路由增加信息
  const url = new URL(window.location.href);
  url.searchParams.set("info", JSON.stringify(item).trim());
  window.history.pushState({}, "", url.href);
}

async function handleInclude(fragmentShader){
  const includeReg = /^\s*#include.*$/gm;
  const matches = fragmentShader.match(includeReg);

  if(matches && (matches.length > 0)){
    for(let i = 0; i < matches.length; i++){
      const item = matches[i];
       // 获取"""中间的路径
       let libPath = item.match(/"(.*)"/)[1];
       // 把相对路径转换为绝对路径
       if(libPath.startsWith("./")){
         libPath = libPath.replace(/^\.\//, "fragment/");
       } else if(libPath.startsWith("../")){
         libPath = libPath.replace(/^(\.\.\/)/, "/");
       } else {
         libPath = "fragment/" + libPath;
       }
       const res = await fetch(libPath).then(res => res.text());
       fragmentShader = fragmentShader.replace(item, `\n${res}\n`)
    }
    // 这里再次执行替换，防止include文件也include了其他的文件
    fragmentShader = await handleInclude(fragmentShader)
  }
  return fragmentShader;
}

// 处理url路由
const url = new URL(window.location.href);
const info = url.searchParams.get("info");
if (info) {
  const item = JSON.parse(info);
  handleClick(item)
}
