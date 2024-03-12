import {
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getGuests } from '../../services/apiGuests';
import { GUESTS_SIZE } from '../../utils/constants';

export function useGuests() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	const sortByRaw =
		searchParams.get('sortBy') || 'fullName-asc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	const page = !searchParams.get('page')
		? 1
		: Number(searchParams.get('page'));

	const {
		isLoading,
		data: { data: guests, count } = {},
		error,
	} = useQuery({
		queryKey: ['guests', sortBy, page],
		queryFn: () => getGuests({ sortBy, page }),
	});

	const pageCount = Math.ceil(count / GUESTS_SIZE);

	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ['guests', sortBy, page + 1],
			queryFn: () => getGuests({ sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ['guests', sortBy, page - 1],
			queryFn: () => getGuests({ sortBy, page: page - 1 }),
		});
	}

	return { isLoading, guests, count, error };
}
