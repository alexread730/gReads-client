$(() => {

    let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000`: `https://greads-api.herokuapp.com`
    const hrefLocation = window.location.href;
    const parsedQueryString = parseQueryString(hrefLocation);
    const ONE_BOOK_URL = `${BASE_URL}/api/v1/books/${parsedQueryString}`
    makeBooksRequest(ONE_BOOK_URL);


    $('select').material_select();
    makeAuthorRequest(BASE_URL + "/api/v1/author");


    $('.edit-book-btn').click(() => {
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
    // edit book functions///
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

    function editBookRequest(url) {
      const bookRequest = new Request(url, {
        method: "put",
        mode: 'cors',
        body: JSON.stringify(createBookObject()),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      editBook(bookRequest)
    };

    function editBook(request) {
      fetch(request)
        .then(parseJSON)
        .then(response => {
          // window.location = `./books.html`
          console.log('edited!');
        })
        .catch(throwError)
    }

    /////////////////////////////
    // get book info from api///
    ///////////////////////////

    function makeBooksRequest(url) {
      const bookRequest = new Request(url, {
        method: "get",
        mode: 'cors'
      })
      getBook(bookRequest)
    };

    function getBook(request) {
      fetch(request)
        .then(parseJSON)
        .then(response => {
          console.log(response);
          fillInputs(response);
        })
        .catch(throwError)
    }

    function fillInputs(book) {
      $('#title').val(book.title);
      $('#genre').val(book.genre);
      $('#cover-img').val(book.cover_url);
      $('#description').val(book.description);
    }



});
