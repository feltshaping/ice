var app=require('express')()
var qs=require('qs')

var fs=require('fs')
app.use((req,res,next)=>{
  var chunk=''
  req.on('data',i=>chunk+=i)
  req.on('end',()=>{
    req.b=qs.parse(chunk)
    next()
  })
})
app.get('/',(req,res)=>{res.end('ice')})
app.post('/post',(req,res)=>{
  fs.writeFile('./app.json',qs.stringify(req.b),'utf8',(err,result)=>{
    if(err!==null){console.log(err);}
    else{console.log('result',result);}
  })
})
app.listen(3000,()=>console.log('express on 3000'))
