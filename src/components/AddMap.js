import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as markerActions } from "../redux/modules/marker";


const { kakao } = window;

const AddMap = ({ keyword }) => {

    //지도 아래 확인창에 바뀔 장소명
    const [title, setTitle] = useState();

    useEffect(() => {
    
    //생성된 마커를 담을 빈 배열 생성
    let markers = [];

    //지도 생성
    const container = document.getElementById('myMap'); 
    const options = {
      center: new kakao.maps.LatLng(37.545642179638556, 126.98117041998981), //지도 중심 좌표
      level: 8 //지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);


    //인포윈도우 객체 생성
    let infowindow = new kakao.maps.InfoWindow({ zIndex:1 });

        
    //장소검색 객체 생성
    const ps = new kakao.maps.services.Places(); 

    //장소검색 객체를 통해 입력한 keyword로 장소 검색 요청
    ps.keywordSearch(keyword, placesSearchCB); 


    //키워드에 맞게 지도범위 재설정하고 마커 보여주는 함수
        function placesSearchCB(data, status, pagination) {
            // console.log(data);

        if (status === kakao.maps.services.Status.OK) {

            //지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
            let bounds = new kakao.maps.LatLngBounds();

            //받은 data의 길이(키워드에 맞는 장소 갯수)만큼 for문 돌림
            for (let i = 0; i < data.length; i++) {

                //받아온 data의 i번째 정보로 마커 보여주는 함수 실행
                displayMarker(data[i]);

                //받아온 data의 i번째의 좌표와 bounds로 지도범위 재설정
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       

            //지도에 재설정한 bounds를 세팅
            map.setBounds(bounds);
        } 
    }

    //장소에 맞는 마커 보여주는 함수
    function displayMarker(place) {  //place = data의 i번째 전체 정보

        // 해당 좌표의 마커와 지도를 합쳐 마커 객체 생성
        let marker = new kakao.maps.Marker({
            map: map, //마커를 놓을 지도(useEffect 내에 전역변수로 선언되어 있어 사용 가능)
            position: new kakao.maps.LatLng(place.y, place.x) //받은 장소의 좌표값으로 맵에서의 마커의 위치 지정
        });

        //마커배열에 생성된 마커들을 담는다.
        // markerArr.push(marker);

        //마커에 마우스 hover 시 장소명이 인포윈도우에 표출되게 함
        kakao.maps.event.addListener(marker, 'mouseover', function () {
            
            //인포윈도우에 장소명 content를 세팅하고
            infowindow.setContent('<div style="padding:5px;font-size:11px;text-align:center;">'
                + place.place_name + '</div>');
            
            //지도에서 마커 위쪽에 열리게 함
            infowindow.open(map, marker);
        });


        // ** 사용자가 클릭한 마커의 '장소명'을 지도 아래 텍스트 칸에 띄워줌
        kakao.maps.event.addListener(marker, 'click', function () {
            setTitle(place.place_name);
        });
    }
    
    }, [keyword]); //(=> 입력된 키워드가 바뀔 때마다 실행)


    return (
        <MapsBlock>
            {/* 지도 */}
            <Maps id='myMap'></Maps>

            {/* 지도 아래 확인용 텍스트 창 */}
            <PlaceName type="text" value={title} placeholder="선택된 장소명" disabled />
        </MapsBlock>

    );
}

const MapsBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0px;
`;

const Maps = styled.div`
    width: 400px;
    height: 300px;
`;

const PlaceName = styled.input`
    width: 40vw;
    height: 30px;
    text-align: center;
    margin-top: 20px;
    border: 1px solid black;
    background-color: white;
    border-radius: 30px;
    font-size: 13px;
`;

export default AddMap;
