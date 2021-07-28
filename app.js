const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF 
app.use('/static', express.static('static'));       // for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF 
app.set('view engine', 'pug');      // set the template engine as pug 
app.set('views', path.join(__dirname, 'views'));        // set the view directory

// END POINTS 
app.get('/', (req,res)=>{
    const con = "This is the best content on the internet so far so use it wisely."
    const params = {'title': 'Gym WEbsite using Pug', 'content': con}
    res.status(200).render('index.pug', params);
});
app.post('/', (req, res)=>{
    name1= req.body.name;
    age= req.body.age;
    gender= req.body.gender;
    address= req.body.address;
    more= req.body.more;

    let outputToWrite = `The name of the client is ${name1}, ${age} years old, ${gender}, residing at ${address}, More about client: ${more}.`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message': 'Your form has been submitted successfully.'}
    res.status(200).render('index.pug', params);
});

// START THE SERVER 
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
});