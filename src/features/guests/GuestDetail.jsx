import styled from 'styled-components';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
	HiHome,
	HiMiniUserGroup,
	HiMoon,
} from 'react-icons/hi2';

import { useGetGuest } from './useGetGuest';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetGuestBooking } from './useGetGuestBooking';

import { Flag } from '../../ui/Flag';
import Empty from '../../ui/Empty';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import Heading from '../../ui/Heading';
import ButtonText from '../../ui/ButtonText';
import Button from '../../ui/Button';

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
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1.2rem;
	padding: 2rem 4rem 1rem 4rem;
	color: #e0e7ff;
	font-size: 1.7rem;
	font-weight: 400;

	p {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}

	&:not(:last-of-type) {
		border-bottom: 1px solid var(--color-grey-200);
		padding: 2rem 4rem;
	}
`;

const Guest = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.6rem;
	color: #e0e7ff;
`;

const Footer = styled.footer`
	padding: 1rem 4rem;
	font-size: 1.2rem;
	color: var(--color-grey-500);
	text-align: right;
`;

function GuestDetail() {
	const { guest, isLoading: isLoadingGuest } = useGetGuest();
	const { booking, isLoading: isLoadingBooking } =
		useGetGuestBooking();

	const moveBack = useMoveBack();
	const navigate = useNavigate();

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

				{booking.length > 0 ? (
					booking.map((booking) => (
						<Section key={booking.id}>
							{
								<>
									<div>
										<HiHome />
										<p title={`Cabin's name`}>
											{booking.cabins.name}
										</p>
									</div>

									<div>
										<HiMiniUserGroup />
										<p title="Number of guests">
											{booking.numGuests}
										</p>
									</div>

									<div>
										<HiMoon />
										<p title="Number of nights">
											{booking.numNights}
										</p>
									</div>

									<div title="Start booking date">
										<p>
											{format(
												new Date(booking.startDate),
												'dd/MM/yyyy',
											)}
										</p>
										<p>
											{format(new Date(booking.startDate), 'p')}
										</p>
									</div>

									<div title="End booking date">
										<p>
											{format(
												new Date(booking.endDate),
												'dd/MM/yyyy',
											)}
										</p>
										<p>
											{format(new Date(booking.endDate), 'p')}
										</p>
									</div>

									<div>
										<Button
											onClick={() =>
												navigate(`/bookings/${booking.id}`)
											}
										>
											Check booking
										</Button>
									</div>
								</>
							}
						</Section>
					))
				) : (
					<Section>This user has no booking yet</Section>
				)}

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
