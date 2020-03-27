function setHeaderTitle(search) {
  const headerTitle = document.querySelector('header span');
  headerTitle.innerText = search;
}

function clearMain() {
  const main = document.querySelector('main');
  main.innerHTML = '';
}

function setError(error) {
  const mainSpan = document.querySelector('main span');
  mainSpan.innerText = error;    
}

function createImage(image) {
  const main = document.querySelector('main');
  const imageDiv = document.createElement('div');

  imageDiv.classList.add('image');

  imageDiv.style['background-image'] = `url(/images/${image.filename})`;
  
  imageDiv.onclick = () => window.location.href = `image.html?id=${image.id}`;

  main.appendChild(imageDiv);
}

function createImages(images) {
  images.forEach(createImage);
}

async function start() {
  const search = window.location.search.split('search=')[1].split('&')[0];
  const searchType = window.location.search.split('searchType=')[1];

  setHeaderTitle(search);

  try {
    const images = await getImagesBySearchAPI({ search, searchType });
  
    clearMain();
    createImages(images);
  } catch(error) {
    setError(error);
  }
}

start();

