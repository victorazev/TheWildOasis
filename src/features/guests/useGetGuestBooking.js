import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBookingByGuestId } from '../../services/apiBookings';

export function useGetGuestBooking() {
	const { guestId } = useParams();

	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['guestBookings', guestId],
		queryFn: () => getBookingByGuestId(guestId),
		retry: false,
	});

	return { isLoading, booking, error };
}
