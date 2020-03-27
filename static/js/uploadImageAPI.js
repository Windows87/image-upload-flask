function uploadImageAPI({ image, name, type }) {
  const body = new FormData();
  
  body.append('image', image);
  body.append('name', name);
  body.append('type', type);
  
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`/api/images/`, { method: 'POST', body });
      const res = await call.json();
      next(res);
    } catch(error) {
      reject('Error on upload Image');
    }
  });
}
      