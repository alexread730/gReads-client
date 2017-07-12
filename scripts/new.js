$(() => {

   $('select').material_select();

   function isValid(value) {
     if (value !== "" && typeof value == "string") {
       return true;
     } else {
       Materialize.toast('All fields must be completed!', 4000);
     }
   }

   function validateAddForm() {
     if (isValid($('#title').val()) && isValid($('#genre').val()) && isValid($('#cover-img').val()) && isValid($('#description').val()) && isValid($('#select-author option:checked').val())) {
       return true;
     } else {
       return false;
     }
   }
   $('.add-book-btn').click(() => {
     validateAddForm();

   })
})
