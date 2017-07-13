$(() => {

    let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000`: `https://greads-api.herokuapp.com`
    const hrefLocation = window.location.href;
    const parsedQueryString = parseQueryString(hrefLocation);

    let authorArray = [];

    $('select').material_select();
    makeAuthorRequest(BASE_URL + "/api/v1/author");


    $('.add-book-btn').click(() => {
      validateAddForm();
      addBookRequest(BASE_URL + "/api/v1/books");
      authorArray.forEach(function(author) {
        addAuthorBook(`${BASE_URL}/api/v1/books`, author)
      })
    })

    $('.add-author-btn').click(() => {
      const selectedID = $('select').val().split("||")[0];
      const selectedName = $('select').val().split("||")[1];
      $('ul').append(`<li>${selectedName}</li>`);

      if (!authorArray.includes(selectedID)) {
        authorArray.push(selectedID);
      }



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
      const validTitle = $('#title').val().trim() != "";
      const validGenre = $('#genre').val().trim() != "" && ($('#genre').val.length < 12);
      const validDescription = $('#description').val().trim() != "";
      const validAuthors = authorArray != [];

      if (validTitle && validGenre && validDescription && validAuthors) {
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
        $('select').append(`<option value="${author.id}||${author.firstName} ${author.lastName}">${author.firstName} ${author.lastName}</option>`)
      })
      $('select').material_select();
    }

    //////////////////////////
    // add book functions////
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
          console.log(response);
          authorArray.forEach(author => {
            addAuthorBook(BASE_URL + "/api/v1/author-book", response, author);
          })
        })
        .catch(throwError)
    }

    //////////////////////////
    // add author functions//
    ////////////////////////

    function createAuthorBookObject(bookId, authorId) {

      const authorBookObject = {
        book_id: bookId,
        author_id: authorId

      }
      return authorBookObject;
    }

    function addAuthorBook(url, bookId, authorId) {
      const authBookRequest = new Request(url, {
        method: "post",
        mode: 'cors',
        body: JSON.stringify(createAuthorBookObject(bookId, authorId)),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      addAuthor(authBookRequest)
    };

    function addAuthor(request) {
      fetch(request)
        .then(parseJSON)
        .then(response => {
          window.location = `./books.html`
        })
        .catch(throwError)
    }
});
