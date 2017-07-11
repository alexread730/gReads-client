$(() => {

  const BOOKS_URL = 'http://localhost:3000/api/v1/books';

  function parseJSON(response) {
    return response.json();
  }

  function throwError(res) {
    return new Error("Error")
  }


  makeBooksRequest(BOOKS_URL)

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
      })
      .catch(throwError)
  }

});
