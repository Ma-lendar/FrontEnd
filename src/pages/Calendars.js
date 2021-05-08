import React from 'react';
import styled from 'styled-components';
import CalendarFolders from '../components/CalendarFolders';
import Header from '../components/Header'
import SideBar from '../components/SideBar';


const Calendars = () => {
	return (
			<>
		  	<Wrapper>
					{/* 유저 사이드바 */}
					<SideBarBlock>
							<SideBar />
					</SideBarBlock>

					{/* 캘린더 폴더들 */}
					<CalendarsWrapper>
							<Header />
							<CalendarFolders />
					</CalendarsWrapper>
        </Wrapper>
      </>
	);
};

const Wrapper = styled.div`
    width: 100vw;
    height: 95vh;
    display: flex;
`;

const SideBarBlock = styled.div`
    width: 20vw;
    height: 95vh;
    z-index: 10;
`;

const CalendarsWrapper = styled.div`
  width: 100vw;
	height: 90vh;
	margin-top: 5vh;
	background-color: #f1f3f5;

	display: flex;
	flex-direction: column;
`;

export default Calendars;