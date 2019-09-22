class ProductsList {
  constructor(state) {
    this.state = state;
    this._initialProducts = this._products = state.products;
    this._container = document.querySelector(`.products-list`);

    this._sortUp = this._sortUp.bind(this);
    this._sortDown = this._sortDown.bind(this);
    this._filter = this._filter.bind(this);
    this._resetFilters = this._resetFilters.bind(this);
    this._addToCart = this._addToCart.bind(this);
    this._removeFromCart = this._removeFromCart.bind(this);
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
  }

  _renderCardList() {
    this._cardListContainer = document.querySelector(`.products-list`);
    this._cardListContainer.innerHTML = ``;

    const productCards = this._products
      .map((product) => {
        const amountInCart =
          this.state.productsInCart[product.id] === void 0
            ? 0
            : this.state.productsInCart[product.id];
        const productCard = `
        <div class="product">
          <h2 class="product__title">${product.title}</h2>
          <img class="product__image" src="${product.image}">
          <p class="product__description">${product.description}</p>
          <p class="product__price">Price: \$${product.price}</p>
          <div class="product__cart">
            <button class="product__cart-btn  product__card-btn--remove" title="Remove this product from cart" data-product-id="${product.id}">-</button>
            <span class="product__cart-text">
              In your cart: ${amountInCart}
            </span>
            <button class="product__cart-btn  product__card-btn--add" title="Add this product to cart" data-product-id="${product.id}">+</button> 
          </div>
        </div>
       `;
        return productCard;
      })
      .join(``);
    this._cardListContainer.innerHTML = productCards;
    this._attachHandlers();
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

    const filterResetBtn = document.querySelector(
      `.products-sorts__filter-reset-button`
    );
    filterResetBtn.addEventListener(`click`, this._resetFilters);

    const cartBtnsAdd = document.querySelectorAll(`.product__card-btn--add`);
    cartBtnsAdd.forEach((cartBtn) =>
      cartBtn.addEventListener(`click`, this._addToCart)
    );

    const cartBtnsRemove = document.querySelectorAll(
      `.product__card-btn--remove`
    );
    cartBtnsRemove.forEach((cartBtn) =>
      cartBtn.addEventListener(`click`, this._removeFromCart)
    );
  }

  _addToCart(event) {
    const productId = event.target.dataset.productId;
    const currentAmountInCart =
      this.state.productsInCart[productId] === void 0
        ? 0
        : this.state.productsInCart[productId];
    this.state.productsInCart[productId] = currentAmountInCart + 1;
    this._renderCardList();
  }

  _removeFromCart(event) {
    const productId = event.target.dataset.productId;
    const currentAmountInCart =
      this.state.productsInCart[productId] === void 0
        ? 0
        : this.state.productsInCart[productId];
    this.state.productsInCart[productId] =
      currentAmountInCart - 1 < 0 ? 0 : currentAmountInCart - 1;
    this._renderCardList();
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
    this._filterPriceLowInput.value = "";
    this._filterPriceHighInput.value = "";
    this._filter();
  }
}

export default ProductsList;
