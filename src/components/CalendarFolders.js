import React from 'react';
import styled from 'styled-components';



const CalendarFolders = () => {
	return (
		<Wrapper>

			<CalendarFoldersBlock>
				<TitleWrapper>
					<Title>심심이님의 캘린더들</Title>
				</TitleWrapper>

				<FoldersWrapper>
					<Folder1>
						
					</Folder1>
					<Folder2>
						
					</Folder2>
					<Folder3>
						
					</Folder3>
				</FoldersWrapper>

			</CalendarFoldersBlock>

		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 50vw;
	height: 70vh;
	background-color: lightgrey;
	position: absolute;
	top: 9vh;
	left: 25vw;
	padding: 20px 10vw;

	padding: 5vw 10vw 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const CalendarFoldersBlock = styled.div`
	position: absolute;
	top: 0;
	left: 0;
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 65vw;
	height: 7vh;
	margin-top: 7vh;
	text-align: center;
`;

const Title = styled.div`
	font-size: 15px;
	font-weight: 600;
`;

const FoldersWrapper = styled.div`
	position: absolute;
	left: 50px;
	width: 55vw;
	height: 55vh;
	
	background-color:#b6ffd2;
	display: flex;
	justify-content: space-around;
	flex-wrap: nowrap;
	padding: 12px 2vw;
`;

const Folder1 = styled.div`
	width: 10vw;
	height: 10vw;
	background-color: lightblue;
`;
const Folder2 = styled.div`
	width: 10vw;
	height: 10vw;
	background-color: lightblue;
`;
const Folder3 = styled.div`
	width: 10vw;
	height: 10vw;
	background-color: lightblue;
`;

export default CalendarFolders;