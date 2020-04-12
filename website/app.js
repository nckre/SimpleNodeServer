//Helper Functions
function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}
function createText(text) {
  return document.createTextNode(text); // Create text for new Node
}
function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}
function createNodeWithText(element, text) {
  const node = createNode(element);
  const nodeText = createText(text);
  const nodeWithText = append(node, nodeText);
  return node;
}

// Event listener for go-button click
document.getElementById('generate').addEventListener('click', performAction);


// App to GET data from API and POST data + input to server
function performAction(e){
  const fav = document.getElementById('fav').value
  const animalName = document.getElementById('animal').value
  // Get data from API
  getAnimal('/fakeAnimalData')
  // Post the API data and text input data to server
  .then(function(data){
    // POST data from API and text input from field to /addAnimal endpoint
    postData('/addAnimal', {animal:animalName, fact:data.fact, favo:fav});
  })
  .then(function(){
    updateUI()
  }
  )
}

// Make API GET request to get animal data
const getAnimal = async (url)=>{
  const res = await fetch(url)
  try {
    const data = await res.json();
    console.log("1. Getting the data from API")
    console.log(data)
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// POST data object to server endpoint
const postData = async ( url = '', data = {})=>{
  console.log("2. Posting API + Input data:")
  console.log(data)
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    const newData = await response.json();
    console.log("3. This is the new data:")
    console.log(newData)
  }catch(error) {
    console.log("error", error);
  }
}

// Update UI with new elements
const updateUI = async () => {
  const animalList = document.getElementById('animalList')
  const request = await fetch('/all');
  console.log("4. Fetching data from server...")
  try{
    let animals = await request.json();
    let lastAnimal = animals.slice(-1)[0];
    console.log(lastAnimal);
    let newAnimal = createNodeWithText('li', lastAnimal.animal);
    append(animalList, newAnimal);
    console.log(lastAnimal);
    /* for (animal of animals) {
      console.log(animal)
      let animalBullet = createNode('li');
      let bulletName = createText(animal.animal);
      append(animalBullet, bulletName);
      let animalAnecdotes = createNode('ul');
      let animalFac = createNodeWithText('li', animal.facts);
      let animalFav = createNodeWithText('li', animal.fav);
      append(animalAnecdotes, animalFac);
      append(animalAnecdotes, animalFav);
      append(animalBullet, animalAnecdotes);
      append(animalList, animalBullet);
    } */
      document.getElementById('animalName').innerHTML = animals[0].animal;
      document.getElementById('animalFact').innerHTML = animals[0].facts;
      document.getElementById('animalFav').innerHTML = animals[0].fav;
  }catch(error){
    console.log("error", error);
  }
}