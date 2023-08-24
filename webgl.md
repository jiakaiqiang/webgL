### webgl的运行流程
顶点缓冲区->顶点着色器->图元装配->光珊化->片元着色器->帧缓冲器->显示器

![原理](./webgl25a.png)
### 顶点着色器
```js
//顶点着色器
<script id="vertexShader" type="x-shader/x-vertex">
attribute vec4 a_Position; //顶点坐标属性-----定义的坐标为四个矢量值 范围 -1~1
uniform vec4 u_Position; //顶点全局变量
void main(){
    gl_Position = a_Position;
    gl_PointSize = 10.0; //顶点大小
}
</script>
```
### 片元着色器
```js
//片元着色器
<script id="fragmentShader" type="x-shader/x-fragment">

precision mediump float;  //定义精度 ----中精度浮点形
void main(){
    gl_FragColor=  vec4(1,0,0,1);///   可以理解成是rgba
}
</script>
```
### 实例

```HTML
<canvas id='canvas'></canvas>
```
<script>
let canvas = document.getElementById('canvas');

let gl = canvas.getContext('webgl');

//获取顶点着色器的源文件信息
let vertexShaderSource = document.getElementById('vertexShader').innerText;
let fragmentShaderSource = document.getElementById('fragmentShader').innerText;

//创建或者程序并加载着色器资源
createProgram(gl,vertexShaderSource,fragmentShaderSource);

//创建缓冲区-----程序取色的缓冲区
let buffer =  gl.createBuffer();
//绑定缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

//创建缓冲区数据
let vertexs = new Float32Array([
    0,0,
    0.3,0,
    0,0.2,

])

//将数据写入缓冲区
gl.bufferData(gl.ARRAY_BUFFER,vertexs,gl.STATIC_DRAW);

//获取顶点着色器变量
let a_Position=gl.getAttribLocation(program,'a_Position');
//启用顶点着色器变量
gl.enableVertexAttribArray(a_Position);
//将缓冲区数据写入顶点着色器变量
gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0); 


gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3); //绘制三个点-----组成的三角形


//创建着色器函数
function loadShader(gl,type,source){
    //创建着色器对象
    let shader = gl.createShader(type);
    //将着色器源文件信息加载到着色器对象中
    gl.shaderSource(shader,source);
    //编译着色器
    gl.compileShader(shader);
    //返回着色器对象
    return shader;
}

// 创建着色器程序
function createProgram(gl,vertexShaderSource,fragmentShaderSource){
    //创建着色器程序
    let program = gl.createProgram();
    //将顶点着色器加载到着色器程序中
    gl.attachShader(program,loadShader(gl,gl.VERTEX_SHADER,vertexShaderSource));
    //将片元着色器加载到着色器程序中
    gl.attachShader(program,loadShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource));
    //链接着色器程序
    gl.linkProgram(program);
    //使用着色器程序
    gl.useProgram(program);
    gl.program =  program
    //返回着色器程序
    return program;

}

</script>
