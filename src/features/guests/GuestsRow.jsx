/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiEye } from 'react-icons/hi2';

import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';

const StyledName = styled.span`
	font-weight: 600;
	color: var(--color-grey-600);
`;

function GuestsRow({
	guest: {
		id: guestId,
		fullName,
		nationality,
		countryFlag,
		email,
	},
}) {
	const navigate = useNavigate();

	return (
		<Table.Row>
			<StyledName>{fullName}</StyledName>

			<span>{email}</span>

			<span>
				<img
					src={countryFlag}
					style={{ width: '2.4rem', paddingRight: '0.5rem' }}
				/>
				{nationality}
			</span>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={guestId} />
					<Menus.List id={guestId}>
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/guests/${guestId}`)}
						>
							See details
						</Menus.Button>
					</Menus.List>
				</Menus.Menu>
			</Modal>
		</Table.Row>
		//Menu: All details, current bookings, check guest's bookings historic.
	);
}

export default GuestsRow;
