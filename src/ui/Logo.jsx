import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	max-height: 9.6rem;
	padding: 0.75rem 0rem 0rem 0rem;
	width: auto;
	@media (max-width: 991px) {
		max-height: 4rem;
	}
`;

function Logo() {
	const { isDarkMode } = useDarkMode();

	const imgSrc = isDarkMode
		? '/logo-dark.png'
		: '/logo-light.png';

	return (
		<StyledLogo>
			<Img src={imgSrc} alt="Logo" />
		</StyledLogo>
	);
}

export default Logo;
