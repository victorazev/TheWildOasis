import supabase from './supabase';

export async function getGuests() {
	const { data, error } = await supabase
		.from('guests')
		.select('*');

	if (error) {
		console.log(error);
		throw new Error('Guests could not be loaded');
	}

	return data;
}
