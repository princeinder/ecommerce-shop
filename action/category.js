import { Category } from "../model/category.js";

export function loadCategories() {
  const category = Category.createCategoryInstance();
  const result = category.getCategories();
  result
    .then((data) => {
      const categoriesList = new CustomEvent("category-list", {
        detail: data,
        bubbles: true,
      });
      dispatchEvent(categoriesList);
    })
    .catch((err) => {
      const categoriesList = new CustomEvent("category-list", {
        detail: err,
        bubbles: true,
      });
      dispatchEvent(categoriesList);
    });
}
