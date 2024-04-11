import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';
import Logo from './Logo';
import {
	HiOutlineCalendarDays,
	HiOutlineHomeModern,
	HiOutlineIdentification,
	HiOutlineUsers,
} from 'react-icons/hi2';

const NavContainer = styled.nav`
	background-color: var(--color-grey-0);
	padding: 0.5rem 1rem;
	border-bottom: 1px solid var(--color-grey-100);
`;

const NavList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-height: 6rem;
`;

const NavItem = styled.li`
	margin-right: 10px;
	position: relative;
	cursor: pointer;
`;

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	display: flex;
	gap: 0.4rem;
	padding: 0.5rem;

	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-lg);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function NavFull() {
	return (
		<NavContainer>
			<NavList>
				<NavItem>
					<StyledNavLink to="/dashboard">
						<Logo />
					</StyledNavLink>
				</NavItem>

				<NavItem>
					<StyledNavLink to="/guests">
						<HiOutlineIdentification />
						<span>Guests</span>
					</StyledNavLink>
				</NavItem>

				<NavItem>
					<StyledNavLink to="/bookings">
						<HiOutlineCalendarDays />
						<span>Bookings</span>
					</StyledNavLink>
				</NavItem>

				<NavItem>
					<StyledNavLink to="/cabins">
						<HiOutlineHomeModern />
						<span>Cabins</span>
					</StyledNavLink>
				</NavItem>

				<NavItem>
					<StyledNavLink to="/users">
						<HiOutlineUsers />
						<span>Users</span>
					</StyledNavLink>
				</NavItem>

				<NavItem>
					<HeaderMenu>
						<UserAvatar />
					</HeaderMenu>
				</NavItem>
			</NavList>
		</NavContainer>
	);
}

export default NavFull;
