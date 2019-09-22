import App from "./app";
import {loadData} from "./server-communication";

loadData()
  .then((data) => {
    App.init(data);
  })
  // .catch((error) =>
  //   window.console.log(
  //     `There some problem with loading game-data from server. Try to refresh the page. 
  //     Error: ${error}`
  //   )
  // );
