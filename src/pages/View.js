import React, { useEffect, useState, useRef } from "react";
import { actionCreators as markerActions } from "../redux/modules/marker";
import { useDispatch } from 'react-redux';
import ViewMap from "../components/ViewMap";
import SideBar from '../components/SideBar';
import ViewInput from '../components/ViewInput';
import styled from 'styled-components';
import Header from '../components/Header';


// view(인풋창)가 데이터를 들고 있고 (useState로)
// 필요한 자식컴포넌트(ViewList, ViewMap)에게 props로 전달
function View() {
    return (
        <>
            <Wrapper>
                {/* 유저 사이드바 */}
                <SideBarBlock>
                    <SideBar />
                </SideBarBlock>

                {/* ViewInput 하나에 검색창, 검색결과목록, 지도 모두 포함*/}
                <ViewWrapper>
                    <Header />
                    <ViewMap />
                </ViewWrapper>

            </Wrapper>
        </>
    );
}


const Wrapper = styled.div`
    width: 90vw;
    height: 100vh;
    display: flex;
`;

const SideBarBlock = styled.div`
    width: 22vw;
    height: 100vh;
    z-index: 10;
`;

const ViewWrapper = styled.div`
    width: 78vw;
	height: 100vh;
    display: flex;
    flex-direction: column;
`;

export default View;
