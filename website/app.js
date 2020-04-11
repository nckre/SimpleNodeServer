// Event listener for go-button click
document.getElementById('generate').addEventListener('click', performAction);


// App to GET data from API and POST data + input to server
function performAction(e){
  const fav = document.getElementById('fav').value
  const animalName = document.getElementById('animal').value
  console.log("This is the fav fact:")
  console.log(fav)
  // Get data from API
  getAnimal('/fakeAnimalData')
  // Post the API data and text input data to server
  .then(function(data){
    // POST data from API and text input from field to /addAnimal endpoint
    postData('/addAnimal', {animal:animalName, fact:data.fact, favo:fav});
  })
  .then(updateUI()
  )
}

// Make API GET request to get animal data
const getAnimal = async (url)=>{
  const res = await fetch(url)
  try {
    const data = await res.json();
    console.log("Getting the data from API")
    console.log(data)
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

// POST data object to server endpoint
const postData = async ( url = '', data = {})=>{
  console.log("Posting API + Input data:")
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
    console.log("This is the new data:")
    console.log(newData)
    return newData
  }catch(error) {
    console.log("error", error);
  }
}

// Update UI with new elements
const updateUI = async () => {
  const request = await fetch('/all');
  console.log("Fetching data from server...")
  try{
    const allData = await request.json();
    console.log(allData)
      document.getElementById('animalName').innerHTML = allData[0].animal;
      document.getElementById('animalFact').innerHTML = allData[0].facts;
      document.getElementById('animalFav').innerHTML = allData[0].fav;
  }catch(error){
    console.log("error", error);
  }
}