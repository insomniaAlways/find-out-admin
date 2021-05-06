import "./App.less";
import store from "./store";
import { Provider } from "react-redux";
import Navigations from "./navigations";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcmNhTBGgiA-zklWpGGxe1NRRgYOkcwnA",
  authDomain: "find-out-405a8.firebaseapp.com",
  databaseURL: "https://find-out-405a8.firebaseio.com",
  projectId: "find-out-405a8",
  storageBucket: "find-out-405a8.appspot.com",
  messagingSenderId: "306597878774",
  appId: "1:306597878774:web:36d40b793f755a414a85d7",
  measurementId: "G-KLKTYHRX97"
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}

export default App;
