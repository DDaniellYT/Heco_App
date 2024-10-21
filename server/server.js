const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

var requests = [{subject:"testing"},{subject:"tss2"}];

app.post('/login',(req,res)=>{
  if(req.body.user.name == 'admin') res.send({allowed: true});
  else res.send({allowed: false})
})
app.post('/requestItem',(req,res)=>{
  requests.push(req.body);
  res.send("");
})
app.post('/requestArr',(req,res)=>{
  requests = req.body;
  res.send("");
})
app.get('/request',(req,res)=>{
  console.log("get request");
  console.log(requests);
  res.send(requests)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
