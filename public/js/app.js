const weatherForm = document.querySelector("form");
const Search = document.querySelector("input");
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From javaScript' 

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = Search.value;
  messageOne.textContent = 'loading...'
  messageTwo.textContent = '';
  
  fetch("http://localhost:3000/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast; 
      }
    });
  });

});
