
const form = document.querySelector('form');

function setError(error) {
  const mainSpan = document.querySelector('body span');
  mainSpan.innerText = error;    
}

async function onFormSubmit(event) {
  event.preventDefault();

  const sentenceInput = document.querySelector('#sentence');
  const numberInput = document.querySelector('#number');
  const offsetInput = document.querySelector('#offset');
  const submitButton = document.querySelector('input[type="submit"]');

  const sentence = sentenceInput.value;
  const number = numberInput.value;
  const ignoreOffset = offsetInput.value || 0;

  try {
    submitButton.disabled = true;
    submitButton.value = 'Minning..';

    await minningImagesAPI({ sentence, number, ignoreOffset });
    
    window.location.href = `/search.html?search=${sentence}&searchType=type`;
  } catch(error) {
    alert(error);
    submitButton.disabled = false;
    submitButton.value = 'Mine!';
  }
}

form.addEventListener('submit', onFormSubmit);;