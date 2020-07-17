import { loadProducts } from "../action/product.js";

class Product extends HTMLElement {
  constructor() {
    super();
    this.state = {
      sortby: "title",
      orderby: "asc",
      count: 36,
      currentPage: 1,
      products: [],
    };
    this.shadow = this.attachShadow({ mode: "open" });
    this.style = document.createElement("style");
    this.style.textContent = `
    .pagination > li.current > a, .pagination > li.current > span {
    background-color: #428bca;
    color: #fff;
    }
    `;
  }

  connectedCallback() {
    const { sortby, orderby, count, currentPage } = this.state;
    loadProducts(sortby, count, orderby, currentPage);
    this.shadow.innerHTML = "loading";
    addEventListener("product-list", (e) => this.productList(e));
  }
  onFilterActions(sortby, orderby, count) {}
  render(detail) {
    var html = `<link href="assets/css/bootstrap.css" rel="stylesheet">
                <link href = "assets/ItemSlider/css/main-style.css" rel = "stylesheet" />
                <link href="assets/css/style.css" rel="stylesheet" />
                <style>
                .pagination > li.current > a, .pagination > li.current > span{
                  background-color:#428bca;
                  color:#fff;
                }
                </style>
                 <script src="assets/js/jquery-1.10.2.js"></script>
                <script src="assets/js/bootstrap.js"></script>
                <script src="assets/ItemSlider/js/modernizr.custom.63321.js"></script>
                <script src="assets/ItemSlider/js/jquery.catslider.js"></script>`;
    html += `<div class="row">
      <div class="btn-group alg-left-pad">
        <ol class="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li class="active">Electronics</li>
        </ol>
      </div>
      <div class="btn-group alg-right-pad">
        <button type="button" class="btn btn-default">
          <strong>${detail.total} </strong>items
        </button>
     
      </div>
    </div><div class="row">`;
    if (detail.total == 0) html += "No products found";
    else
      html += detail.items
        .map((inner, count) => {
          return `
       <div  class="col-md-4 text-center col-sm-6 col-xs-6">
        <div class="thumbnail product-box" style="height:580px;">
            <img  style="height:250px;" src="${inner.image}" alt="" />
            <div class="caption">
                <h3><a href="#">${inner.name}</a></h3>
                <p>Price : <strong>$ ${inner.price}</strong>  </p>
                <p>${inner.description} </p>
                <p><a href="#" class="btn btn-success" role="button">Add To Cart</a> <a href="#" class="btn btn-primary" role="button">See Details</a></p>
            </div>
        </div>
        </div>`;
        })
        .join("");
    html += `</div><div class="row">
      <ul class="pagination alg-right-pad"><li><a href="#">&laquo;</a></li>`;
    for (var i = 1; i <= detail.numberOfPages; i++)
      html += `<li class="${detail.currentPage == i ? "current" : ""}">
        <a id="currentPage" href="#" >${i}</a>
      </li>`;

    html += `  <li><a href="#">&raquo;</a></li>  </ul></div>`;
    console.log("dd");
    return html;
  }
  getProductsCount() {}

  setState(key, value) {
    this.state[key] = value;
  }
  async productList({ detail }) {
    this.shadow.innerHTML = this.render(detail);

    const searchBtn = document.querySelector("#search-items");

    searchBtn.addEventListener("keyup", (search) => {
      const { sortby, orderby, count } = this.state;
      loadProducts(sortby, count, orderby, search.target.value);
    });
    const currentPage = document.querySelector(".pagination");
    currentPage.addEventListener("click", (currentP) => {
      const { sortby, orderby, count } = this.state;
      loadProducts(sortby, count, orderby, search.target.value);
    });
  }
}

customElements.define("app-products", Product);
