import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let alert초기값 = true;

let reducer2 = (state = alert초기값, 액션) => {
  if (액션.type == "닫기") {
    state = false;
  }
  return state;
};

let 기본state = [{ id: 99, name: "멋진신발", quan: 2 }];

/** reducer는 항상 state을 퉤 뱉어야 됨 */
let reducer = (state = 기본state, 액션) => {
  if (액션.type === "항목추가") {
    let copy = [...state];
    let alrdyExistItemInCart = copy.find((x) => x.id == 액션.payload.id);
    if (alrdyExistItemInCart) {
      alrdyExistItemInCart.quan++;
    } else {
      copy.push(액션.payload);
    }
    return copy;
  } else if (액션.type === "수량증가") {
    let copy = [...state];
    copy.find((x) => x.id == 액션.payload.id).quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    copy.find((x) => x.id == 액션.payload.id).quan--;
    return copy;
  } else {
    return state;
  }
};
let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
