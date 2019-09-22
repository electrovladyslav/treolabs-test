(function () {
'use strict';

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
    this._showDetailedInfo = this._showDetailedInfo.bind(this);
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
    <section class="products-list"></section>
    <hr>
    <section class="visited-products">
    <h2 class="visited-products__title">Visited products</h2>
    <div class="visited-products__list"></div>
    </section>
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
          <img class="product__image" src="${product.image}" title="Click to see detailed information about this product" data-product-id="${product.id}">
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

    const poductsImages = document.querySelectorAll(`.product__image`);
    poductsImages.forEach((cartBtn) =>
      cartBtn.addEventListener(`click`, this._showDetailedInfo)
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

  _showDetailedInfo(event) {
    const productId = event.target.dataset.productId;
    const product = this.state.products.find(
      (element) => element.id == productId
    );

    const template = document.createElement(`template`);
    template.innerHTML = `
      <div class="popup">
        <button class="popup__close-btn">X</button>
        <p>Here you can find all detailed iformation about this product</p>
        ${this._renderProductTemplate(product)}
      </div>
    `;
    this._container.appendChild(template.content);

    document
      .querySelector(`.popup__close-btn`)
      .addEventListener("click", () =>
        this._container.removeChild(document.querySelector(`.popup`))
      );

    if (this.state.visitedProducts.indexOf(productId) === -1) {
      this.state.visitedProducts.push(productId);
      this._addVisitedProduct(product);
    }
  }

  _renderProductTemplate(product) {
    return `
    <h3 class="product__title"> ${product.title}</h3>
    <img class="product__image" src="${product.image}">
    <p class="product__description">${product.description}</p>
    <p class="product__price">Price: \$${product.price}</p>
    `;
  }

  _addVisitedProduct(product) {
    const visitedProductsContainer = document.querySelector(
      `.visited-products__list`
    );
    const template = document.createElement(`template`);
    template.innerHTML = `
    <div class="product">
      ${this._renderProductTemplate(product)}
    </div>
    `;
    visitedProductsContainer.appendChild(template.content);
  }
}

const SERVER_URL = `https://demo5782565.mockable.io/`;
const LOGIN_PATH = "login";

const loadData = () => {
  return fetch(SERVER_URL).then(
    (res) => res.json(),
    (err) => window.console.log(err)
  );
};

const authorize = (data) => {
  const init = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(SERVER_URL + LOGIN_PATH, init).then(
    (res) => res.json(),
    (err) => window.console.log(err)
  );
};

class Login {
  constructor() {}

  get template() {
    return `
    <section class="login">
    <h1 class="login__title">Please login</h1>
    <form class="login__form" action="#" method="post">
      <label class="login__label">
        Username
        <input class="login__input" type="text" name="login" placeholder="Username" required=""/>
      </label>
      <label class="login__label">Password
        <input class="login__input" type="password" name="password" placeholder="Password" required="">
      </label>
      <button class="login__submit" type="submit">Login</button>
    </form>
    </section>`;
  }

  render() {
    this._domTemplate = document.createElement(`template`);
    this._domTemplate.innerHTML = this.template;
    const container = document.querySelector(`.root`);
    container.innerHTML = ``;
    this._attachHandlers();
    container.appendChild(this._domTemplate.content);
  }

  _attachHandlers() {
    const form = this._domTemplate.content.querySelector(`.login__form`);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = {
        login: event.target[0].value,
        password: event.target[1].value
      };
      authorize(data).then(() => {location.hash = '';});
    });
  }
}

const initialState = {
  products: [],
  productsInCart: {
    // id: quantity
  },
  visitedProducts: [],
};

class Application {
  static init(products) {
    this.state = Object.assign({}, initialState, {
      products: products
    });

    this.routes = {
      '': ProductsList,
      'login': Login,

    };

    const hashChangeHandler = () => {
      const path = location.hash.replace(`#`, ``);
      this.changeHash(path);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
    this.redirectTo('login');
  }

  static changeHash(path) {
    const Controller = this.routes[path];
    if (Controller) {
      const controller = new Controller(this.state);
      controller.render();
    }
  }

  static redirectTo(path) {
    location.hash = path;
  }
}

loadData()
  .then((data) => {
    Application.init(data);
  });
  // .catch((error) =>
  //   window.console.log(
  //     `There some problem with loading game-data from server. Try to refresh the page. 
  //     Error: ${error}`
  //   )
  // );

}());

//# sourceMappingURL=main.js.map
