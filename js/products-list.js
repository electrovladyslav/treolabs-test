class ProductsList {
  constructor(products) {
    this._initialProducts = this._products = products;
    this._container = document.querySelector(`.products-list`);

    this.sortUp = this.sortUp.bind(this);
    this.sortDown = this.sortDown.bind(this);
    this.filter = this.filter.bind(this);
    this.resetFilters = this.resetFilters.bind(this);

    this.attachHandlers();
  }

  render() {
    const productCards = this._products
      .map((product) => {
        const productCard = `
        <div class="product">
          <h2 class="product__title">${product.title}</h2>
          <img class="product__image" src="${product.image}">
          <p class="product__description">${product.description}</p>
          <p class="product__price">Price: \$${product.price}</p>
          <button class="product__buy">Add to cart</button>
        </div>
       `;
        return productCard;
      })
      .join(``);
    this._container.innerHTML = productCards;
  }

  attachHandlers() {
    const sortingBtnUp = document.querySelector(
      `.products-sorts__price-button--increment`
    );
    sortingBtnUp.addEventListener(`click`, this.sortUp);

    const sortingBtnDown = document.querySelector(
      `.products-sorts__price-button--decrement`
    );
    sortingBtnDown.addEventListener(`click`, this.sortDown);

    this._filterPriceLowInput = document.querySelector(
      `.products-sorts__filter-price--low`
    );
    this._filterPriceHighInput = document.querySelector(
      `.products-sorts__filter-price--high`
    );
    const filterBtn = document.querySelector(`.products-sorts__filter-button`);
    filterBtn.addEventListener(`click`, this.filter);

    const filterResetBtn = document.querySelector(`.products-sorts__filter-reset-button`);
    filterResetBtn.addEventListener(`click`, this.resetFilters);
  }

  sortUp() {
    this._products.sort((first, second) => first.price - second.price);
    this.render();
  }

  sortDown() {
    this._products.sort((first, second) => second.price - first.price);
    this.render();
  }

  filter() {
    const lowPrice = +this._filterPriceLowInput.value;
    let highPrice = +this._filterPriceHighInput.value;
    if (this._filterPriceHighInput.value === "") highPrice = Infinity;

    this._products = this._initialProducts.filter(
      (product) => product.price > lowPrice && product.price < highPrice
    );
    this.render();
  }

  resetFilters() {
    this._filterPriceLowInput.value = '';
    this._filterPriceHighInput.value = '';
    this.filter();
  }
}

export default ProductsList;
