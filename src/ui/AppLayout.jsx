import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import NavFull from './NavFull';
import Sidebar from './Sidebar';
import Header from './Header';

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: none;
	height: 100vh;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: 26rem 1fr;
	}
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow: auto;
`;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function AppLayout() {
	const [isMobile, setIsMobile] = useState(
		window.innerWidth < 992,
	);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 992);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<StyledAppLayout>
			{isMobile ? (
				<NavFull />
			) : (
				<>
					<Sidebar />
					<Header />
				</>
			)}
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
