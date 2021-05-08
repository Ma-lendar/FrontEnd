import React, { useState } from "react";
import styled from 'styled-components';
import AddMap from "./AddMap";


//일정생성 모달창 안의 지도 인풋창
const AddInput = ({ inputText, onChange, onSubmit }) => {

    return (
        <>
        {/* 검색창 */}
        <InputForm onSubmit={onSubmit}>
                <TextField placeholder="키워드 입력" onChange={onChange} value={inputText} />
            &nbsp;<Button type="submit">검색</Button>
            </InputForm>
        </>
    );
};


const InputForm = styled.form`
	display: flex;
	margin: 10px auto;
`;

const TextField = styled.input`
    width: 150px;
    height: 15px;
    border: none;
    border-bottom: 1px solid black;
	font-size: 12px; //placeholer 글자크기 조정

    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    width: 50px;
    height: 20px;
    border: none;
    cursor: pointer;
    font-size: 12px;
    border-radius: 30px;
`;

export default AddInput;