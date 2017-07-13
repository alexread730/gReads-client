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
        appendBooks(response);
      })
      .catch(throwError)
  }

  function appendBooks(response) {
    response.forEach(book => {

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
    });

  }
})
