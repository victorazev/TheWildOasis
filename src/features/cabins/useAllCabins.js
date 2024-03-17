import { useQuery } from '@tanstack/react-query';
import { getAllCabins } from '../../services/apiCabins';

export function useAllCabins() {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['allCabins'],
		queryFn: getAllCabins,
	});

	return { isLoading, cabins, error };
}
