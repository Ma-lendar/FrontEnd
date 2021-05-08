import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as markerActions } from "../redux/modules/marker";
// import '../css/map.css';
import Header from './Header';


const { kakao } = window;


const ViewMap = ({ keyword }) => {

    useEffect(() => {
        console.log(keyword);

        //마커 담을 빈 배열 생성
        var markers = [];

        //지도 생성
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.545642179638556, 126.98117041998981), //지도 중심 좌표
            level: 8 //지도의 확대 레벨
        };
        const map = new kakao.maps.Map(container, options);


        // 인포윈도우 객체 생성
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
            
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        //여기의 keyword = ViewInput에서 받아온 키워드
        ps.keywordSearch(keyword, placesSearchCB);
        console.log(keyword);

        
        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
        
            console.log(data);
            console.log(status);
            console.log(pagination);

            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {

                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);

                // 페이지 번호를 표출합니다
                displayPagination(pagination);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                alert('검색 결과가 존재하지 않습니다.');
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {

                alert('검색 결과 중 오류가 발생했습니다.');
                return;

            }
        }
    
        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(markerData) {

            var listEl = document.getElementById('placesList'),
                menuEl = document.getElementById('menu_wrap'),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = '';

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for (var i = 0; i < markerData.length; i++) {

                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(markerData[i].y, markerData[i].x),
                    marker = addMarker(placePosition, i),
                    itemEl = getListItem(i, markerData[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                // eslint-disable-next-line no-loop-func
                (function (marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function () {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function () {
                        infowindow.close();
                    });

                    itemEl.onmouseover = function () {
                        displayInfowindow(marker, title);
                    };

                    itemEl.onmouseout = function () {
                        infowindow.close();
                    };
                })(marker, markerData[i].place_name);

                fragment.appendChild(itemEl);

            }

            // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }

        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {
            var store_info = "'"
            store_info += JSON.stringify(places);
            store_info = store_info.replaceAll(">", "^");
            store_info = store_info.replaceAll(' ', "#");
            store_info += "'";
            // alert(store_info);

            var el = document.createElement('li'),
                itemStr = '<span className="markerbg marker_' + (index + 1) + '" ></span>' +
                    '<div className="info"  onclick=select_title(' + (index + 1) + ',' + store_info + ')>' +
                    '   <h5>' + places.place_name + '</h5>';

            if (places.road_address_name) {
                itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span className="jibun gray" id="type_' + (index + 1) + '">' + places.address_name + ' </span>';
            } else {
                itemStr += '    <span>' + places.address_name + '</span>';
            }

            itemStr += '  <span className="tel">' + places.phone + '</span>' +
                '</div>';

            el.innerHTML = itemStr;
            el.className = 'item';

            return el;
        }
        
        let cnt = -1;
        function select_title(index, store_info) {
            store_info = store_info.replaceAll("^", ">");
            store_info = store_info.replaceAll('#', " ");

            //places = store_info를 다시 JSON 형태로 바꾼 것
            var places = JSON.parse(store_info);
            console.log(places);

            cnt++;
            addMarker(places.y, places.x, places.title, cnt);
        }
        // 마커를 표시할 위치와 title 객체 배열입니다
        // 마커를 표시할 위치 데이터들을 for문 형태로 집어 넣는다
        function addMarker(lat, lng, title, idx) {

            //마커를 표시할 위치에 장소명과 위경도 좌표를 넣는다
            var positions = [
                {
                    title: title,
                    latlng: new kakao.maps.LatLng(lat, lng)
                }
            ];

            //position에 들어있는 객체 갯수를 alert로 띄움
            // alert(positions.length) 
            
            // 마커 이미지의 이미지 주소입니다
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';

            //(for문을 돌리면서 마커 생성)
            for (var i = 0; i < positions.length; i++) {
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(36, 37);

                // 마커 이미지에 추가되는 옵션(spriteOrigin에서 idx 사용)
                var imgOptions = {
                    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                }

                // 위의 세 정보로 마커 이미지를 생성
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

                // 마커를 최종 생성합니다 (
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커를 표시할 위치
                    title: positions[i].title, // 마커의 장소명
                    image: markerImage // 마커 이미지
                });
            }
            
            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 마커 배열에 생성된 마커를 추가합니다

            //최종적으로 만들어진 마커 반환
            return marker;
        }
        

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            //마커 빈 배열 반환
            markers = [];
        }

        
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;

                if (i === pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }
        
        // 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
        
        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }
        
    }, [keyword]);

    return (
        <>
        
        <MapWrapper className="map_wrap">
            <Maps id='myMap'></Maps>
            
            <ListWrapper id="menu_wrap" className="bg_white">
                <Title id="title">바다 가고 싶다</Title>

                {/* 날짜 버튼 */}
                <DayWrapper id="dayWrapper" style={{}}>
                    <LeftOutlined style={{ cursor: "pointer"}}/>
                    <DayButton input="text" readonly>
                        <div id="day" style={{ fontSize: "14px", fontWeight: "bold", paddingRight: "7px"}}>DAY 1</div>
                        <div id="date" style={{ fontSize: "11px", color: "#868e96"}}>4월 22일</div>
                    </DayButton>
                    <RightOutlined style={{ cursor: "pointer"}}/>
                </DayWrapper>

                {/* 목록 및 페이지네이션 */}
                <div id="placesWrapper" style={{ width: "20vw", height: "50vh", backgroundColor: "rgb(229, 220, 245)"}}>
                    <PlacesList id="placesList"></PlacesList>
                    <Pagination id="pagination"></Pagination>
                </div>
            </ListWrapper>
            </MapWrapper>
        </>
    );

}

const MapWrapper = styled.div`
    height: 95vh;
    .map_wrap,
    .map_wrap * {
        margin: 0;
        padding: 0;
        font-family: 'Malgun Gothic',dotum,'돋움',sans-serif;
        font-size: 12px;
    }
    .map_wrap a,
    .map_wrap a:hover,
    .map_wrap a:active {
        color: #000;
        text-decoration: none;
    }
    .map_wrap {
        position: relative;
        width: 80vw;
        height: 500px;
        float: right;
    }
`;

const Maps = styled.div`
    width: 82vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

const ListWrapper = styled.div`
    position: absolute;
    top: 5vh;
    left: 20vw;
    bottom: 0;

    width: 20vw;
    @media (max-width: 300px) {
        width: 30vw;
    }

    height: 70vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 15px 10px;
    padding: 1.5vw;
    overflow-y: auto;
    background:rgba(255, 255, 255, 0.7);
    z-index: 3;
    font-size: 11px;
    border-radius: 10px;
`;

const Title = styled.div`
    width: 20vw;
    height: 13px;
    font-size: 18px;
    font-weight: bold;
    margin: 8px 0 20px;
`;

const DayWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
    height: 10vh;
`;

const DayButton = styled.div`
    width: 14vw;
    height: 28px;
    margin: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #B5FFEF;
    border-radius: 30px;
`;

const PlacesList = styled.ul`
    li {
        list-style: none;
    }
    .item {
        position: relative;
        border-bottom: 1px solid #888;
        overflow: hidden;
        cursor: pointer;
        min-height: 65px;
    }
    .item span {
        display: block;
        margin-top:4px;
    }
    .item h5,
    .item .info {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .item .info{
        padding: 5px 0 10px 20px;
    }
    .info .gray {
        color:#8a8a8a;
    }
    .info .jibun {
        padding-left: 15px;
        background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png') no-repeat;
    }
    .info .tel {
        color:#009900;
    }
    .item .markerbg {
        float: left;
        position: absolute;
        width: 36px;
        height: 37px;
        margin: 10px 0 0 10px;
        background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png') no-repeat;
    }
    .item .marker_1 {background-position: 0 -10px;}
    .item .marker_2 {background-position: 0 -56px;}
    .item .marker_3 {background-position: 0 -102px}
    .item .marker_4 {background-position: 0 -148px;}
    .item .marker_5 {background-position: 0 -194px;}
    .item .marker_6 {background-position: 0 -240px;}
    .item .marker_7 {background-position: 0 -286px;}
    .item .marker_8 {background-position: 0 -332px;}
    .item .marker_9 {background-position: 0 -378px;}
    .item .marker_10 {background-position: 0 -423px;}
    .item .marker_11 {background-position: 0 -470px;}
    .item .marker_12 {background-position: 0 -516px;}
    .item .marker_13 {background-position: 0 -562px;}
    .item .marker_14 {background-position: 0 -608px;}
    .item .marker_15 {background-position: 0 -654px;}
`;

const Pagination = styled.div`
    margin: 10px auto;
    text-align: center;
    display: flex;
    justify-content: center;
    
    a {
        display: inline-block;
        margin-right: 10px;
    }

    .on {
        font-weight: bold;
        cursor: default;
        color:#777;
    }
`;



export default ViewMap;
