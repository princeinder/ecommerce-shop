import { loadCategories } from "../action/category.js";

class Category extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    loadCategories();
    this.shadow.innerHTML = "loading";
    addEventListener("category-list", (e) => this.categoriesList(e));
  }

  categoriesList({ detail }) {
    this.shadow.innerHTML = this.render(detail);
  }

  render(detail) {
    var html = `<link href="assets/css/bootstrap.css" rel="stylesheet">
                <link href = "assets/ItemSlider/css/main-style.css" rel = "stylesheet" />
                <link href="assets/css/style.css" rel="stylesheet" />
                 <script src="assets/js/jquery-1.10.2.js"></script>
                <script src="assets/js/bootstrap.js"></script>
                <script src="assets/ItemSlider/js/modernizr.custom.63321.js"></script>
                <script src="assets/ItemSlider/js/jquery.catslider.js"></script>`;
    html += detail.items
      .map((inner, count) => {
        const subdata = inner.subCategories
          .map((innersub, count) => {
            return `<li class="list-group-item">${innersub.name}
            </li>`;
          })
          .join("");
        return `<div>
          <a href="#" class="list-group-item active list-group-item-success">${inner.name}
                    </a>
          <ul class="list-group">${subdata}</ul>
      </div>`;
      })
      .join("");
    return html;
  }
}

customElements.define("app-categories", Category);
