function getImagesBySearchAPI({ search, searchType }) {
    return new Promise(async (next, reject) => {
      try {
        const call = await fetch(`/api/images/${searchType}/${search}`);
        const res = await call.json();
        next(res);
      } catch(error) {
        reject('Error on get Images');
      }
    });
  }
  