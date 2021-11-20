
// populates categories (array of objects) ex. [ {id:1, name:"bags"}, ...]
  const getCategories = () => {
    fetch("/categories")
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

// populates colors (array of objects) ex. [ {id:1, name:"beige"}, ...]
  const getColors = () => {
    fetch("/colors")
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

// populates seasons (array of objects) ex. [ {id:1, name:"spring"}, ...]
  const getSeasons = () => {
    fetch("/seasons")
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  module.exports = {getSeasons, getCategories, getColors};