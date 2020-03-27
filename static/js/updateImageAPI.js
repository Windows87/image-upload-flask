function updateImageAPI(id, { name, type }) {
  const body = new FormData();

  body.append('name', name);
  body.append('type', type);

  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`/api/images/${id}`, { method: 'PUT', body });
      const res = await call.json();
      next(res);
    } catch(error) {
      reject('Error on update Image');
    }
  });
}
    