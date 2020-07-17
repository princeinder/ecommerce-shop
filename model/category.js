const instance = null;

export class Category {
  static createCategoryInstance() {
    return instance ? instance : new Category();
  }

  async getCategories() {
    try {
      var res = await new Promise((resolve, reject) => {
        fetch("model/categories.json")
          .then((response) => response.json())
          .then(function (items) {
            fetch("model/products.json")
              .then((response) => response.json())
              .then(function (pro) {
                var data = {};
                data.items = items;
                if (items) resolve(data);
              })
              .catch((error) => reject(new Error(error.message)));
          })
          .catch((error) => reject(new Error(error.message)));
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}
