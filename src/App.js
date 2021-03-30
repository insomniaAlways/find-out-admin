import "./App.less";
import store from "./store";
import { Provider } from "react-redux";
import Navigations from "./navigations";
import Navbar from "./components/Navbar/navbar";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Navigations />
    </Provider>
  );
}

export default App;
