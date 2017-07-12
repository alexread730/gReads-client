$(() => {

    let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000`: `https://greads-api.herokuapp.com`

    $('select').material_select();
    makeAuthorRequest(BASE_URL + "/api/v1/author");


    $('.add-book-btn').click(() => {
      validateAddForm();
      addBookRequest(BASE_URL + "/api/v1/books");

    })

    $('.add-author-btn').click(() => {
      const selectedAuthor = $('select').val();
      $('ul').append(`<li>${selectedAuthor}</li>`);
    })
  //////////////////////////
  // general functions/////
  ////////////////////////

    function isValid(value) {
      if (value !== "" && typeof value == "string") {
        return true;
      } else {
        Materialize.toast('All fields must be completed!', 4000);
      }
    }

    function validateAddForm() {
      if (isValid($('#title').val()) && isValid($('#genre').val()) && isValid($('#cover-img').val()) && isValid($('#description').val()) && isValid($('.select-author option:checked').val())) {
        return true;
      } else {
        return false;
      }
    }

    //////////////////////////
    //add authors to select/
    ////////////////////////



    function makeAuthorRequest(url) {
      const author = new Request(url, {
        method: "get",
        mode: 'cors'
      })
      getAuthors(author)
    };

    function getAuthors(request) {
      fetch(request)
        .then(parseJSON)
        .then(response => {
          console.log(response);
          populateSelect(response);
        })
        .catch(throwError)
    }

    function populateSelect(authors) {
      authors.forEach(author => {
        $('select').append(`<option value="${author.firstName} ${author.lastName}" data-id=${author.id}>${author.firstName} ${author.lastName}</option>`)
      })
      $('select').material_select();
    }

    //////////////////////////
    // add book functions/////
    ////////////////////////

    function createBookObject() {
      const bookObject = {
        title: $('#title').val(),
        genre: $('#genre').val(),
        description: $('#description').val(),
        cover_url: $('#cover-img').val()

      }
      return bookObject;
    }

    function addBookRequest(url) {
      const bookRequest = new Request(url, {
        method: "post",
        mode: 'cors',
        body: JSON.stringify(createBookObject()),
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
          window.location = `./books.html`
        })
        .catch(throwError)
    }

});
