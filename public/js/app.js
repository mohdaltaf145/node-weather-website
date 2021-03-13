console.log("Client side javascript side is loaded!");

// fetch("http://localhost:3000/weather?address=!").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

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