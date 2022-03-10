const express = require('express');
const cors  = require('cors');

const app = express();
app.use(cors());


const checkAuth = (req, res, next) => {
   const isAdmin = false;
   if(isAdmin) {
      next();
   }else{
      console.log("you not a admin");
   }
}
app.get('/', (req, res) => { res.send("<h1>Home Page</h1>") });

app.get('/api/users',checkAuth, (req, res,next) => {
  const data = [
     {id: 1 , name: 'John', status: 'active',address: '123 Main Street'},
     {id: 2 , name: 'Lalisa', status: 'active',address: '123 Main Street'},
     {id: 3 , name: 'Rose', status: 'active',address: '123 Main Street'},
     {id: 4 , name: 'Jennie', status: 'active',address: '123 Main Street'},
     {id: 5 , name: 'Karina', status: 'active',address: '123 Main Street'},
  ];
  
   res.json(data) 
})



const PORT = 3001;
app.listen(PORT, () => {
   console.log(`Server run in ${PORT} port`);
});