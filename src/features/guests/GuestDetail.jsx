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
import { useGetGuestBooking } from './useGetGuestBooking';

const StyledGuestDataBox = styled.section`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	overflow: hidden;
`;

const Header = styled.header`
	background-color: var(--color-brand-500);
	font-size: 1.8rem;
	font-weight: 500;
	padding: 3.2rem 4rem 1.2rem;
	color: var(--color-grey-500);
`;

const Section = styled.section`
	padding: 2rem 4rem;
	color: #e0e7ff;
	font-size: 1.7rem;
	font-weight: 400;
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
	const { guest, isLoading: isLoadingGuest } = useGetGuest();
	const { booking, isLoading: isLoadingBooking } =
		useGetGuestBooking();

	const moveBack = useMoveBack();

	if (isLoadingGuest || isLoadingBooking) return <Spinner />;
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
				<Header>
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
				</Header>

				<Section>
					{booking != undefined ? (
						<>
							This user has a booking of {booking.numNights}{' '}
							nights with {booking.numGuests} guests in Cabin{' '}
							{booking.cabins.name}
							<p>
								From{' '}
								{format(
									new Date(booking.startDate),
									'MMMM dd p',
								)}
								, to{' '}
								{format(new Date(booking.endDate), 'MMMM dd p')}
							</p>
						</>
					) : (
						'This user has no booking yet'
					)}
				</Section>

				<Footer>
					<p>
						User created on{' '}
						{format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}
					</p>
				</Footer>
			</StyledGuestDataBox>
		</>
	);
}

export default GuestDetail;
