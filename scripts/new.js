$(() => {

    let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1/books`: `https://greads-api.herokuapp.com/api/v1/books`

    $('select').material_select();
    addBook(BASE_URL);
    $('.add-book-btn').click(() => {
      validateAddForm();

    })

    function parseJSON(response) {
      return response.json();
    }

    function throwError(res) {
      return new Error("Error")
    }

    function createBookObject() {
      const bookObject = {
        title: $('#title').val(),
        genre: $('#genre').val(),
        cover_url: $('#cover-img').val(),
        description: $('#description').val(),
        authors: $('#select-author option:checked').val()

      }
    }

    function addBookRequest(url) {
      const bookRequest = new Request(url, {
        method: "post",
        mode: 'cors',
        body: JSON.stringify(newAccount),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      addBook(bookRequest)
    };

    function addBook(request) {
      fetch(request)
        .then(parseJSON)
        .then(response => {
          console.log(response);
          appendBooks(response);
        })
        .catch(throwError)
    }



   function isValid(value) {
     if (value !== "" && typeof value == "string") {
       return true;
     } else {
       Materialize.toast('All fields must be completed!', 4000);
     }
   }

   function validateAddForm() {
     if (isValid($('#title').val()) && isValid($('#genre').val()) && isValid($('#cover-img').val()) && isValid($('#description').val()) && isValid($('#select-author option:checked').val())) {
       return true;
     } else {
       return false;
     }
   }

})
