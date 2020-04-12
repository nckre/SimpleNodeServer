const express = require('express')
const app = express()
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 80;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };


// Dummy API endpoint
const fakeData = {
  animal: 'lion',
  fact: 'lions suck'
}

app.get('/fakeAnimalData', getFakeData)

function getFakeData(req,res) {
  res.send(fakeData)
}


const animalData = [];

// POST Route to add a new animal
app.post('/addAnimal', cors(), addAnimal);

function addAnimal(req,res){
  newEntry = {
    animal: req.body.animal,
    facts: req.body.fact,
    fav: req.body.favo
  }
  animalData.push(newEntry)
  res.send(animalData)
}

// Respond with animal Data when a GET request is made to the homepage
app.get('/all', getData)

function getData(req,res){
  res.send(animalData)
}