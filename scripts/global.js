
function parseJSON(response) {
  return response.json();
}

function throwError(res) {
  return new Error("Error")
}
