import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect, useSelector, useDispatch } from "react-redux";
import "./Detail.css";

function Detail(props) {
  useEffect(() => {
    //코드를 적습니다 여기
  });
  let { id } = useParams();
  let history = useHistory();
  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });
  let [inputData, inputData변경] = useState("");
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  let Info = (props) => {
    return <p>재고 : {props.재고[id]}</p>;
  };

  let TabContent = (props) => {
    useEffect(() => {
      props.스위치변경(true);
    });
    if (props.누른탭 === 0) {
      return <div>내용0</div>;
    } else if (props.누른탭 === 1) {
      return <div>내용1</div>;
    } else if (props.누른탭 === 2) {
      return <div>내용2</div>;
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${+id + 1}.jpg`}
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes.find((x) => x.id == id).title}</h4>
          <p>{props.shoes.find((x) => x.id == id).content}</p>
          <p>{props.shoes.find((x) => x.id == id).price}원</p>
          <Info 재고={props.재고}></Info>
          {inputData}
          <input
            value="a"
            onChange={(e) => {
              inputData변경(e.target.value);
            }}
          />
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch({
                type: "항목추가",
                payload: { id: 찾은상품.id, name: 찾은상품.title, quan: 1 },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            onClick={() => {
              history.goBack();
            }}
            className="btn btn-danger"
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              누른탭변경(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

//옛날 redux 방식
// redux store 데이터를 가져와서 props로 변환해주는 함수. state==store에 있던 모든 데이터
// function state를props화(state) {
//   return {
//     // redux store에 있던 객체를 state이란 이름으로 쓰겠다. state이란 이름을 props안에 넣어라
//     state: state.reducer,
//     alert열렸니: state.reducer2, //리듀서2에 있는거 가져오는법
//   };
// }
// 퉤 뱉는다
//export default connect(state를props화)(Detail);
export default Detail;
