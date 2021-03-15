import "./App.less";
import store from "./store";
import { Provider } from "react-redux";
import Navigations from "./navigations";

function App() {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}

export default App;
