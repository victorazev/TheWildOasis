import styled from 'styled-components';

import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useAllCabins } from '../cabins/useAllCabins';

import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
	display: grid;
	/* grid-template-columns: 100vw auto;
	grid-template-rows: 1fr; */
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
	gap: 1.5rem;

	@media (min-width: 768px) {
		gap: 2.4rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: auto auto auto;
	}
`;

function DashboardLayout() {
	const { bookings, isLoading: isLoadingBookings } =
		useRecentBookings();
	const {
		confirmedStays,
		isLoading: isLoadingStays,
		numDays,
	} = useRecentStays();
	const { cabins, isLoading: isLoadingCabins } = useAllCabins();

	if (isLoadingBookings || isLoadingStays || isLoadingCabins)
		return <Spinner />;

	return (
		<>
			<StyledDashboardLayout>
				<Stats
					bookings={bookings}
					confirmedStays={confirmedStays}
					numDays={numDays}
					cabinCount={cabins.length}
				/>
				<TodayActivity />

				<DurationChart confirmedStays={confirmedStays} />

				<SalesChart bookings={bookings} numDays={numDays} />
			</StyledDashboardLayout>
		</>
	);
}

export default DashboardLayout;
