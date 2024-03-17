import {
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getGuests } from '../../services/apiGuests';
import { GUESTS_PAGE_SIZE } from '../../utils/constants';

export function useGuests() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get('activity');
	const filter = {
		field: 'activity',
		value: filterValue ? filterValue : 'all',
	};

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
		queryKey: ['guests', filter, sortBy, page],
		queryFn: () => getGuests({ filter, sortBy, page }),
	});

	const pageCount = Math.ceil(count / GUESTS_PAGE_SIZE);

	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ['guests', filter, sortBy, page + 1],
			queryFn: () =>
				getGuests({ filter, sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ['guests', filter, sortBy, page - 1],
			queryFn: () =>
				getGuests({ filter, sortBy, page: page - 1 }),
		});
	}

	return { isLoading, guests, count, error };
}
