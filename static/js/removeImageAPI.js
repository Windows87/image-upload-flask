function removeImageAPI(id) {
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`/api/images/${id}`, { method: 'DELETE' });
      const res = await call.json();
      next(res);
    } catch(error) {
      reject('Error on remove Image');
    }
  });
}
  