import React from "react";
import Add from "./pages/Add";
import View from "./pages/View";
import Calendars from './pages/Calendars';

import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import styled from 'styled-components';
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();

  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          {/* 일정생성 modal창 - 지도로 장소 검색하기 추가하는 컴포넌트 */}
          <Route path="/add" exact component={Add} />
          {/* 지도 조회 페이지 (경로는 임시) */}
          <Route path="/view" exact component={View} />
          <Route path="/" exact component={Calendars} />
        </Switch>
      </ConnectedRouter>
    </>
  )
}


export default App;
