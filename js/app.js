import ProductsList from "./products-list";

class Application {
  static init(products) {
    this._productsList = new ProductsList(products);
    this._productsList.render();
  }
}

export default Application;
