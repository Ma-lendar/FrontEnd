import React from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';


const SideBar = ({ username, profileImage }) => {
		return (
			<SideBarBlock>

				<TextWrapper>
					<Text>마이 캘린더</Text>
				</TextWrapper>
				
				<ProfileWrapper>
					<ProfileImg src="https://i.esdrop.com/d/dmfK4REv1X.jpg" alt="profile" />
					<Text>심심이</Text>
				</ProfileWrapper>

				<ButtonWrapper>
					<Button>마이페이지</Button>
					&nbsp;<Button>로그아웃</Button>
				</ButtonWrapper>
				
				<ButtonWrapper>
					<RegisterButton>캘린더 등록<PlusOutlined style={{ fontSize: "100%", fontWeight: "600", marginLeft: "1vw" }} /></RegisterButton>
				</ButtonWrapper>

				<ButtonWrapper>
					<MiniCalendar>
						월 캘린더
					</MiniCalendar>
				</ButtonWrapper>

				</SideBarBlock>
		);
};

const SideBarBlock = styled.div`
	width: 17vw;
	height: 97.5vh;
	background-color: #eee;
	box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.25);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	z-index: 10;
	top: 0;
	left: 0;
`;

//사이드바 맨위 '마이캘린더' 부분
const TextWrapper = styled.div`
	display: flex;
	height: 5vh;
	margin: 14px 2vw;
`;

//프로필사진과 유저이름 div
const ProfileWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	height: 25vh;
	margin-top: 10px;
	opacity: .75;
`;

//프로필 이미지
const ProfileImg = styled.img`
	width: 100px;
	height: 100px;
	margin-bottom: 10px;
	border-radius: 100px;
`;

//마이캘린더와 유저이름 text 스타일
const Text = styled.div`
	font-weight: bold;
	font-size: 14px;
`;

//마이페이지, 로그아웃, 캘린더등록 버튼, 월 캘린더 div
const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px 0px;
`;

//마이페이지, 로그아웃 버튼
const Button = styled.button`
	border: none;
	border-radius: 30px;
	background-color: white;
	font-size: 1vw;
	font-weight: 600;
	padding: 3px 10px;
	cursor: pointer;
	color: #495057;

	& + & {
		margin-left: 0.8vw;
	}
`;

//캘린더 등록 버튼
const RegisterButton = styled.button`
	background-color: #4CD4C4;
	color: white;
	text-align: center;
	margin-top: 20px;
	width: 18vw;
	padding: 10px 4vw;
	cursor: pointer;
	border: none;
	font-size: 1.2vw;
	font-weight: 600;
`;

//월 캘린더 부분
const MiniCalendar = styled.div`
	width: 90em;
	height: 150px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: lightpink;
	margin: 20px 20px;
`;


export default SideBar;