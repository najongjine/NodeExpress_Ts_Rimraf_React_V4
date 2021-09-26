import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect, useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import axios from "axios";

import "./Detail.css";

function Shaka(props) {
  let [videoUrl, changeVideoUrl] = useState(
    "https://jongfreeblobstorage.blob.core.windows.net/test/20210723134718This_is_me_Moona_Sings_HoloId_Karaoke.webm?sv=2020-08-04&se=2021-08-27T08%3A35%3A21Z&sr=b&sp=racwd&sig=wjLTXa49HXB1mXr%2F%2BjXJej0DVGaI%2FEP%2B2YjJjTkYXGY%3D"
  );
  let [serverUrl, changeServerUrl] = useState(
    "https://221.156.48.39:8443/live/aaaa.flv"
  );
  let [videoData, changeVideoData] = useState();
  let [playing, changePlaying] = useState(true);
  useEffect(() => {
    //코드를 적습니다 여기
  }, []);

  return (
    <div className="container">
      <div className="player-wrapper">
        <ReactPlayer url={serverUrl} playing={playing} width="80%" controls />
      </div>
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
export default Shaka;
