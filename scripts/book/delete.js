$(() => {

  const BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1/books`: `https://greads-api.herokuapp.com/api/v1/books`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);
  const ONE_BOOK_URL = `${BASE_URL}/${parsedQueryString}`
  makeBooksRequest(ONE_BOOK_URL)

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
        appendBook(response);
        deleteBook();
      })
      .catch(throwError)
  }

  function deleteBook() {
    $('.delete-button').click(function() {
      deleteRequest(ONE_BOOK_URL)
    })
  }

  function deleteRequest(url) {
    const deleteBody = {
      id: parsedQueryString
    }
    console.log(deleteBody);
    const request = new Request(url, {
      method: "delete",
      body: JSON.stringify(deleteBody),
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    processRequest(request);
  }

  function appendBook(book) {
    book = book[0]

    let authors = ``

    book.authors.forEach(author => {
      authors += `${author.firstName} ${author.lastName}, `
    })

    authors = authors.substr(0, authors.length-2);

    $('.book').append(`
      <div class="card-wrapper">
        <div class="col s12 m7">
          <div class="card horizontal">
            <div class="card-image">
              <img src="${book.cover_url}">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <h3 class="header">${book.title}</h3>
                <h5>${authors}</h5>
                <p>${book.genre}</p>
                <p>${book.description}</p>
              </div>
              <div class="card-action">
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="delete-button waves-effect waves-light btn col s8 center-align red">Delete ${book.title}?</a>

      `);
    }

  function processRequest(request) {
    fetch(request)
      .then(res => {
        res.json()
          .then(json => {
            return window.location = './books.html';

          })
      })
      .catch(throwError)
  }
})
