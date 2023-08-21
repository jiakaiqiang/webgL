
function defAttr(){
    const defAttr={
        gl:null,
        vertices:[],
        geoData:[],
        size:2,
        attrName:'a_Position',
        count:0,
        types:['POINTS'],
      }
      return defAttr
}
  class Poly{
    constructor(attr){
      Object.assign(this,defAttr(),attr)
      this.init()
    }
    init(){
      const {attrName,size,gl}=this
      if(!gl){return}
      const vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      this.updateBuffer()
      const a_Position=gl.getAttribLocation(gl.program,attrName)
      gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(a_Position)
    }
    addVertice(...params){
      this.vertices.push(...params)
      this.updateBuffer()
    }
    popVertice(){
      const {vertices,size}=this
      const len=vertices.length
      vertices.splice(len-size,len)
      this.updateCount()
    }
    setVertice(ind,...params){
      const {vertices,size}=this
      const i=ind*size
      params.forEach((param,paramInd)=>{
        vertices[i+paramInd]=param
      })
    }
    updateBuffer(){
      const {gl,vertices}=this
      this.updateCount()
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW)
    }
    updateCount(){
      this.count=this.vertices.length/this.size
    }
    updateVertices(params){
      const {geoData}=this
      const vertices=[]
      geoData.forEach(data=>{
        params.forEach(key=>{
          vertices.push(data[key])
        })
      })
      this.vertices=vertices
    }
    draw(types=this.types){
      const {gl,count}=this
      for(let type of types){
        gl.drawArrays(gl[type],0,count);
      }
    }
  }
  function getMousePosInWebgl(event,canvas){
    //获取坐标位置
    const { clientX,clientY} = event


    //获取画布的坐标位置
    const { left,top,width,height } = canvas.getBoundingClientRect()
    //鼠标在画布中的位置
    const [cssX,cssY] =  [clientX - left,clientY - top] 
    
    //获取画布的中心点
    const [canvasX,canvasY] = [width/2,height/2]

    //weglg的坐标
    const [glX,glY] = [cssX - canvasX,- (cssY - canvasY)]
    //因为weblg中的坐标范围是[-1,1]
    const [x,y] = [glX/canvasX,glY/canvasY]
    return {x,y}


}