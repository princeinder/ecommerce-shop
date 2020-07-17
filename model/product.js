const instance = null;
import { sortBy, limit } from "../helper/helper.js";
export class Product {
  static createProductInstance() {
    return instance ? instance : new Product();
  }
  async getProducts(sortby, limitto, orderby, currentPage, search = "") {
    try {
      var res = await new Promise((resolve, reject) => {
        fetch("model/products.json")
          .then((response) => response.json())
          .then(function (items) {
            var data = {};
            var searchdata = [];
            if (search) {
              for (var i = 0; i < items.length; i++) {
                if (items[i]["name"].search(search) != -1) {
                  searchdata.push(items[i]);
                }
              }
              var items = searchdata;
            }
            if (orderby == "desc")
              data.items = limit(items.sort(sortBy(sortby)).reverse(), limitto);
            else data.items = limit(items.sort(sortBy(sortby)), limitto);
            data.limitto = limitto;
            data.total = Object.keys(items).length;
            data.numberOfPages = Math.ceil(data.total / data.limitto);
            data.currentPage = currentPage;
            if (items) resolve(data);
          })
          .catch((error) => reject(new Error(error.message)));
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}
