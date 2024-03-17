import { DEFAULT_PAGE_SIZE } from '../utils/constants';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins({ filter, sortBy, page }) {
	let query = supabase
		.from('cabins')
		.select('*', { count: 'exact' });

	if (filter.value === 'no-discount') {
		query = query.eq('discount', 0);
	}

	if (filter.value === 'with-discount') {
		query = query.gt('discount', 0);
	}

	if (sortBy) {
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === 'asc',
		});
	}

	if (page) {
		const from = (page - 1) * DEFAULT_PAGE_SIZE;
		const to = from + DEFAULT_PAGE_SIZE - 1;

		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.log(error);
		throw new Error('Cabins could not be loaded');
	}

	return { data, count };
}

export async function getAllCabins() {
	const { data, error } = await supabase
		.from('cabins')
		.select('*');

	if (error) {
		console.log(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath =
		newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${
		newCabin.image.name
	}`.replaceAll('/', '');
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	//1. Create/edit cabin
	let query = supabase.from('cabins');

	//1.1 Creation method
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	//1.2 Edition method
	if (id) {
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq('id', id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.log(error);
		throw new Error('Cabin could not be created');
	}

	//2. Upload image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	//3. Delete the cabin if there was an error uploading image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.log(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created',
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase
		.from('cabins')
		.delete()
		.eq('id', id);

	if (error) {
		console.log(error);
		throw new Error('Cabin could not be deleted');
	}

	return data;
}
