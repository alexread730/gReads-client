$(() => {

  let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3001/api/v1/books`: `https://greads-api.herokuapp.com/api/v1/books`


  function parseJSON(response) {
    return response.json();
  }

  function throwError(res) {
    return new Error("Error")
  }

  makeBooksRequest(BASE_URL)

  function makeBooksRequest(url) {
    const bookRequest = new Request(url, {
      method: "get",
      mode: 'cors'
    })
    getBooks(bookRequest)
  };

  function getBooks(request) {
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
      console.log(book);


      $('.books-wrapper').append(`
        <div class="card-wrapper">
          <div class="col s12 m7">
            <div class="card horizontal">
              <div class="card-image">
                <img src="${book.cover_url}">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h3 class="header">${book.title}</h3>
                  <h5>${book.authors}</h5>
                  <p>${book.genre}</p>
                  <p>${book.description}</p>
                </div>
                <div class="card-action">
                  <a class="waves-effect waves-light btn blue">Edit</a>
                  <a class="waves-effect waves-light btn red">Remove</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `);
    });
  }



});
