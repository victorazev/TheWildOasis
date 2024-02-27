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
