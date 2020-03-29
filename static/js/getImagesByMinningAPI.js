function minningImagesAPI({ sentence, number, ignoreOffset }) {
  const body = new FormData();
    
  body.append('sentence', sentence);
  body.append('number', number);
  body.append('ignoreOffset', ignoreOffset);
    
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`/api/images/minning`, { method: 'POST', body });
      const res = await call.json();
      next(res);
    } catch(error) {
      reject('Error on minning Images');
    }
  });
}
        