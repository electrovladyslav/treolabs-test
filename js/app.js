import ProductsList from "./screens/products-list";
import Login from "./screens/login";
import initialState from "./initialState";

class Application {
  static init(products) {
    this.state = Object.assign({}, initialState, {
      products: products
    });
    // this._productsList = new ProductsList(products);
    // this._productsList.render();

    this.routes = {
      '': ProductsList,
      'login': Login,
    //   '/cart': Cart,

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
    // let state;
    // if (data !== void 0) {
    //   state = decodeState(data);
    // } else {
    //   state = initialState;
    // }
    // state = Object.assign({}, state, {
    //   levelsSet: this.levelsSet
    // });
    if (Controller) {
      const controller = new Controller(this.state);
      controller.render();
    }
  }

  static redirectTo(path) {
    location.hash = path;
  }
}

export default Application;
