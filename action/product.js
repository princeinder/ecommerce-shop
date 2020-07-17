import { Product } from "../model/product.js";
export function loadProducts(sort, limit, orderby, currentPage, search) {
  const product = Product.createProductInstance();
  const res = product.getProducts(sort, limit, orderby, currentPage, search);

  res
    .then((data) => {
      const productList = new CustomEvent("product-list", {
        detail: data,
        bubbles: true,
      });
      dispatchEvent(productList);
    })
    .catch((err) => {
      const productList = new CustomEvent("product-list", {
        detail: err,
        bubbles: true,
      });
      dispatchEvent(productList);
    });
}
