/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Table from '../../ui/Table';

const StyledName = styled.span`
	font-weight: 600;
	color: var(--color-grey-600);
`;

function GuestsRow({
	guest: { fullName, nationality, countryFlag, email },
}) {
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
		</Table.Row>
		//Menu: All details, current bookings, check guest's bookings historic.
	);
}

export default GuestsRow;
