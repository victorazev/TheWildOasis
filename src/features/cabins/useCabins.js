import {
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';

export function useCabins() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get('discount');
	const filter = {
		field: 'discount',
		value: filterValue ? filterValue : 'all',
	};

	const sortByRaw = searchParams.get('sortBy') || 'name-asc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	const page = !searchParams.get('page')
		? 1
		: Number(searchParams.get('page'));

	const {
		isLoading,
		data: { data: cabins, count } = {},
		error,
	} = useQuery({
		queryKey: ['cabins', filter, sortBy, page],
		queryFn: () => getCabins({ filter, sortBy, page }),
	});

	const pageCount = Math.ceil(count / DEFAULT_PAGE_SIZE);

	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ['cabins', filter, sortBy, page + 1],
			queryFn: () =>
				getCabins({ filter, sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ['cabins', filter, sortBy, page - 1],
			queryFn: () =>
				getCabins({ filter, sortBy, page: page - 1 }),
		});
	}

	return { isLoading, cabins, error, count };
}
