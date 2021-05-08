// import React, { useState, useEffect, useRef } from "react";
// import styled from 'styled-components';
// import ViewMap from "./ViewMap";


// //지도 조회 페이지의 지도 인풋창
// const ViewInput = () => {
//     const [inputText, setInputText] = useState("");
//     const [place, setPlace] = useState("");


//     //input창에 값이 입력되었을 때 실행
//     const onChange = (e) => {
//         //inputText에 입력한 값을 넣음
//         setInputText(e.target.value);
//     };

//     //제출버튼 눌렀을 때 실행
//     const handleSubmit = (e) => {
//         e.preventDefault(); //form의 onSubmit 함수에는 이걸 해야 아래 내용이 실행됨
//         setPlace(inputText); //inputText를 place에 담음
//         setInputText(""); //input창 다시 초기화
//     };

//     console.log(place);

//     return (
//         <>
//             {/* 밑에 검색결과 목록과 지도 뜨는 곳 */}
//             <ViewWrapper>
//                 <MapWrapper>
//                     {/* 지도와 검색결과 목록 */}
//                     <ViewMap keyword={place} />
//                 </MapWrapper>
//             </ViewWrapper>
//         </>
//     );
// };


// const ViewWrapper = styled.div`
//     width: 76vw;
//     height: 70vh;
//     float: right;
// `;

// const MapWrapper = styled.div`
//     width: 48vw;
//     height: 88vh;
// `;

// export default ViewInput;