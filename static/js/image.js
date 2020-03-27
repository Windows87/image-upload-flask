
const id = window.location.search.split('id=')[1];
const form = document.querySelector('form');

function setError(error) {
  const mainSpan = document.querySelector('body span');
  mainSpan.innerText = error;    
}

function enableEdit() {
  const mainSpan = document.querySelector('body span');
  const form = document.querySelector('form');
  const submitButton = document.querySelector('input[type="submit"]');
  
  const back = document.querySelector('#back');
  const remove = document.querySelector('#remove'); 
  
  mainSpan.style.display = 'none';
  form.style.display = 'flex';
  back.style.display = 'block';
  remove.style.display = 'block';

  submitButton.value = 'Edit';

  remove.onclick = async () => {
    try {
      remove.innerText = 'Removing..';
      await removeImageAPI(id);
      window.location.href = '/';
    } catch(error) {
      alert(error);
      remove.innerText = 'Remove';
    }
  }
}

function enableUpload() {
  const mainSpan = document.querySelector('body span');
  const form = document.querySelector('form');  
  const img = document.querySelector('img');
  const fileInput = document.querySelector('input[type="file"]');

  mainSpan.style.display = 'none';
  form.style.display = 'flex'; 

  img.onclick = () => fileInput.click();

  fileInput.onchange = () => {
    const reader = new FileReader();
    reader.onload = e => img.src = e.target.result;
    reader.readAsDataURL(fileInput.files[0]);      
  }
}

function setImage(image) {
  const img = document.querySelector('img');
  const name = document.querySelector('#name');
  const type = document.querySelector('#type');

  img.src = `/images/${image.filename}`;

  name.value = image.name;
  type.value = image.type;
}

async function onFormSubmit(event) {
  event.preventDefault();

  const fileInput = document.querySelector('input[type="file"]');
  const nameInput = document.querySelector('#name');
  const typeInput = document.querySelector('#type');
  const submitButton = document.querySelector('input[type="submit"]');

  const image = fileInput.files[0];
  const name = nameInput.value;
  const type = typeInput.value;

  try {
    submitButton.disabled = true;

    if(id) {
      submitButton.value = 'Editing..';
      await updateImageAPI(id, { name, type });
      alert('Edited Successfull!');
      submitButton.value = 'Edit';
    }

    if(!id) {
      if(!image) return;

      submitButton.value = 'Uploading..';
      await uploadImageAPI({ image, name, type });
      alert('Uploaded Successfull!');

      submitButton.value = 'Upload!';
      nameInput.value = '';
      typeInput.value = '';
    }
  } catch(error) {
    alert(error);
    submitButton.disabled = false;

    if(id)
      submitButton.value = 'Edit';
    else
      submitButton.value = 'Upload!';
  }
}

async function start() {
  try {
    const image = await getImagesBySearchAPI({ search: id, searchType: 'id' });
    enableEdit();
    setImage(image);
  } catch(error) {
    setError(error);
  }
}

function startUpload() {
  enableUpload();
}

form.addEventListener('submit', onFormSubmit);

if(id)
  start();
else
  startUpload();