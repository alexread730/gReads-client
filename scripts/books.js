$(() => {

  let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1/books`: `https://greads-api.herokuapp.com/api/v1/books`

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

  function deleteRelocation() {
    $('.delete-btn').click(function() {
      const bookId = $(this).data('id');
      console.log(bookId);
      window.location = `./delete.html?id=${bookId}`
    })
  }

  function appendBooks(response) {
    response.forEach(book => {

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
                  <p>${book.genre}</p>
                  <p>${book.description}</p>
                </div>
                <div class="card-action">
                  <a href="" class="waves-effect waves-light btn blue">Edit</a>
                  <a class="waves-effect waves-light btn red delete-btn" data-id=${book.id}>Remove</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `);
    });
    deleteRelocation();

  }



});
