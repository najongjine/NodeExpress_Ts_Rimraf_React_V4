import React from "react";
import { Table } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";

function Cart(props) {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        {state.reducer.map((item, i) => {
          return (
            <tr>
              <td>{+i + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quan}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch({ type: "수량증가", payload: { id: item.id } });
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "수량감소", payload: { id: item.id } });
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          );
        })}
      </Table>
      {state.reducer2 ? (
        <div className="my-alert2">
          <p>지금 구매하시면 20% 할인</p>
          <button
            onClick={() => {
              dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
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

// export default connect(state를props화)(Cart);
export default Cart;
