import supabase from './supabase';

import { GUESTS_PAGE_SIZE } from '../utils/constants';

export async function getGuests({ sortBy, page }) {
	let query = supabase
		.from('guests')
		.select('*', { count: 'exact' });

	if (sortBy) {
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === 'asc',
		});
	}

	if (page) {
		const from = (page - 1) * GUESTS_PAGE_SIZE;
		const to = from + GUESTS_PAGE_SIZE - 1;

		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.log(error);
		throw new Error('Guests could not be loaded');
	}

	return { data, count };
}

export async function getGuest(id) {
	const { data, error } = await supabase
		.from('guests')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Guest not found');
	}

	return data;
}

export async function createGuest(newGuest) {
	const { data, error } = await supabase
		.from('guests')
		.insert([newGuest])
		.select();

	if (error) {
		console.error(error);
		throw new Error('Guest could not be created');
	}

	return data;
}
