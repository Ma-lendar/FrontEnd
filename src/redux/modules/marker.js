import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore";
import { config } from "../../shared/config";


const ADD_MARKER = "ADD_MARKER";
const SET_MARKER = "SET_MARKER";

//여기서 marker => dispatch(addMarker(marker_info))의 marker_info 부분과 동일
//                 + reducer에서 action.payload.marker로 사용됨
const addMarker = createAction(ADD_MARKER, (marker) => ({marker}))
const setMarker = createAction(SET_MARKER, (hotMarker_list, normalMarker_list) => ({hotMarker_list, normalMarker_list}))

const initialState = { }

//MarkerModal.js의 modal창에서 입력받은 값으로 생성한 marker정보를 
//axios로 서버에 보내고 그 결과를 받는 함수
const addMarkerAX = (marker) => {

  return function(dispatch) {

    //받아온 marker 정보를 서버에 보냄
    axios.post(`${config.api}/marker`, {
        markername: marker.title,
        location: [ //좌표는 문자열로 변환해서 보내줌
            marker.latitude.toString(),
            marker.longitude.toString() 
        ],
        address: marker.address,

    }).then((response) => {
        //처리 결과로 서버에서 marker 객체 id를 받음 
        //(=> 이 부분 어떻게 서버에서 받아지는지 백엔드와 협의 필요)
        let marker_info = {
            ...marker,
            id: response.data.markerId,
        }

        //액션생성함수에 마커 정보를 담아서 디스패치 (=> 리듀서에서 사용할 action 객체 생성)
        dispatch(addMarker(marker_info));
        })
    }
}


//reducer 함수 (함수이름이 없어도 됨?!)
//  => action의 결과로 state를 어떻게 바꿀지 정의
export default handleActions(
    {
        //ADD_MARKER(액션)의 결과로
        //기존 state에 새로 받아온 action 객체의 파라미터(payload)를 추가
        [ADD_MARKER]: (state, action) => produce(state, (draft) => {
            draft.normal.unshift(action.payload.marker) //(normal 부분은 여기서는 삭제했으므로 나중에 따로 처리)
        }),
    },
    initialState
);

const actionCreators = {
  addMarkerAX,
}

export { actionCreators };