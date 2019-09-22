class ProductsList {
  constructor(state) {
    this._initialProducts = this._products = state.products;
    this._container = document.querySelector(`.products-list`);

    this._sortUp = this._sortUp.bind(this);
    this._sortDown = this._sortDown.bind(this);
    this._filter = this._filter.bind(this);
    this._resetFilters = this._resetFilters.bind(this);
  }

  get template() {
    return `<h1 class="page-title">TeoLabs Shop</h1>
    <div class="products-sorts">
      <div class="products-sorts__price">
        <span class="products-sorts__price-description">Sort by price</span>
        <button class="products-sorts__price-button products-sorts__price-button--increment">↑</button>
        <button class="products-sorts__price-button products-sorts__price-button--decrement">↓</button>
      </div>

      <div class="products-sorts__filter">
        <span class="products-sort__filter-description">Filter by price. More than</span>
        <input type="number" class="products-sorts__filter-price  products-sorts__filter-price--low" value="200">
        <span class="products-sort__filter-description">Less than</span>
        <input type="number" class="products-sorts__filter-price  products-sorts__filter-price--high" value="700">
        <button class="products-sorts__filter-button">Filter</button>
        <button class="products-sorts__filter-reset-button">Reset filters</button>

      </div>
    </div>
    <div class="products-list"></div>
    `;
  }

  render() {
    this._domTemplate = document.createElement(`template`);
    this._domTemplate.innerHTML = this.template;

    this._container = document.querySelector(`.root`);
    this._container.innerHTML = ``;
    this._container.appendChild(this._domTemplate.content);

    this._renderCardList();
    this._attachHandlers();
  }

  _renderCardList() {
    this._cardListContainer = document.querySelector(`.products-list`);
    this._cardListContainer.innerHTML = ``;
    
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
      this._cardListContainer.innerHTML = productCards;
  }

  _attachHandlers() {
    const sortingBtnUp = document.querySelector(
      `.products-sorts__price-button--increment`
    );
    sortingBtnUp.addEventListener(`click`, this._sortUp);

    const sortingBtnDown = document.querySelector(
      `.products-sorts__price-button--decrement`
    );
    sortingBtnDown.addEventListener(`click`, this._sortDown);

    this._filterPriceLowInput = document.querySelector(
      `.products-sorts__filter-price--low`
    );
    this._filterPriceHighInput = document.querySelector(
      `.products-sorts__filter-price--high`
    );
    const filterBtn = document.querySelector(`.products-sorts__filter-button`);
    filterBtn.addEventListener(`click`, this._filter);

    const filterResetBtn = document.querySelector(`.products-sorts__filter-reset-button`);
    filterResetBtn.addEventListener(`click`, this._resetFilters);
  }

  _sortUp() {
    this._products.sort((first, second) => first.price - second.price);
    this._renderCardList();
  }

  _sortDown() {
    this._products.sort((first, second) => second.price - first.price);
    this._renderCardList();
  }

  _filter() {
    const lowPrice = +this._filterPriceLowInput.value;
    let highPrice = +this._filterPriceHighInput.value;
    if (this._filterPriceHighInput.value === "") highPrice = Infinity;

    this._products = this._initialProducts.filter(
      (product) => product.price > lowPrice && product.price < highPrice
    );
    this._renderCardList();
  }

  _resetFilters() {
    this._filterPriceLowInput.value = '';
    this._filterPriceHighInput.value = '';
    this._filter();
  }
}

export default ProductsList;
