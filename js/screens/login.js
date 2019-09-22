import {authorize} from "../server-communication";

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
      authorize(data).then(() => {location.hash = ''});
    });
  }
}

export default Login;
