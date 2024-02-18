import styled from 'styled-components';
import { format } from 'date-fns';

import { useGetGuest } from './useGetGuest';
import { useMoveBack } from '../../hooks/useMoveBack';

import { Flag } from '../../ui/Flag';
import Empty from '../../ui/Empty';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import Heading from '../../ui/Heading';
import ButtonText from '../../ui/ButtonText';

const StyledGuestDataBox = styled.section`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	overflow: hidden;
`;

const Section = styled.section`
	background-color: var(--color-brand-500);
	font-size: 1.8rem;
	font-weight: 500;
	padding: 3.2rem 4rem 1.2rem;
	color: var(--color-grey-500);
`;

const Guest = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.6rem;
	color: #e0e7ff;
`;

const Footer = styled.footer`
	padding: 1.6rem 4rem;
	font-size: 1.2rem;
	color: var(--color-grey-500);
	text-align: right;
`;

function GuestDetail() {
	const { guest, isLoading } = useGetGuest();
	console.log(guest);

	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;
	if (!guest) return <Empty resourceName="guest" />;

	const {
		id,
		fullName,
		email,
		natinality,
		countryFlag,
		nationalID,
		createdAt,
	} = guest;

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Guest #{id}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<StyledGuestDataBox>
				<Section>
					<Guest>
						{countryFlag && (
							<Flag
								src={countryFlag}
								alt={`Flag of ${natinality}`}
							/>
						)}
						<p>{fullName}</p>
						<span>&bull;</span>
						<p>{email}</p>
						<span>&bull;</span>
						<p>National ID {nationalID}</p>
					</Guest>
				</Section>

				<Footer>
					<p>
						Created{' '}
						{format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}
					</p>
				</Footer>
			</StyledGuestDataBox>
		</>
	);
}

export default GuestDetail;
