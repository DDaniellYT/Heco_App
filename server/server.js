const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.post('/login',(req,res)=>{
  if(req.body.user.name == 'admin') res.send({allowed: true});
  else res.send({allowed: false})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
