import React, { useEffect, useState } from "react";
import { actionCreators as markerActions } from "../redux/modules/marker";
import { useDispatch } from 'react-redux';
import AddMap from "../components/AddMap";
import AddInput from '../components/AddInput';
import styled from 'styled-components';


function Add() {
    const dispatch = useDispatch();


    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

    //input창에 값이 입력되었을 때 실행
    const onChange = (e) => {
        //inputText에 입력한 값을 넣음
        setInputText(e.target.value);
    };

    //제출버튼 눌렀을 때 실행
    const handleSubmit = (e) => {
        e.preventDefault(); //form의 onSubmit 함수에는 이걸 해야 아래 내용이 실행됨
        setPlace(inputText); //inputText를 place에 담음
        setInputText(""); //input창 다시 초기화
    };


    return (
        <React.Fragment>
            <Wrapper>
                <AddInput inputText={inputText} onChange={onChange} onSubmit={handleSubmit} />
                <AddMap keyword={place} />
            </Wrapper>
        </React.Fragment>
    )
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Add;
