import ProductsList from "./screens/products-list";
import Login from "./screens/login";
import initialState from "./initialState";

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

export default Application;
