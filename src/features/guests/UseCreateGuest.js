import {
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createGuest as createGuestApi } from '../../services/apiGuests';

export function UseCreateGuest() {
	const queryClient = useQueryClient();

	const { mutate: createGuest, isLoading: isCreatingGuest } =
		useMutation({
			mutationFn: createGuestApi,
			onSuccess: () => {
				toast.success('New guest successfully created');
				queryClient.invalidateQueries({
					queryKey: ['guests'],
				});
			},
			onError: (err) => toast.error(err.message),
		});

	return { isCreatingGuest, createGuest };
}
