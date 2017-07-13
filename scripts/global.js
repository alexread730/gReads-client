
function parseJSON(response) {
  return response.json();
}

function throwError(res) {
  return new Error("Error")
}

function parseQueryString(queryString) {
  queryString = queryString.split('=')
  return queryString[1];
}
