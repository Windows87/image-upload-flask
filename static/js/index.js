const form = document.querySelector('form');

function onFormSubmit(event) {
  event.preventDefault();

  const searchInput = document.querySelector('input[type="text"]');
  const searchTypeSelect = document.querySelector('select');

  const search = searchInput.value;
  const searchType = searchTypeSelect.value;

  window.location.href = `search.html?search=${search}&searchType=${searchType}`;
}

form.addEventListener('submit', onFormSubmit);