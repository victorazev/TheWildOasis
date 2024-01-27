/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useGuests } from '../guests/useGuests';
import { useCabins } from '../cabins/useCabins';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import Select from '../../ui/Select';

function CreateBookingForm({ onCloseModal }) {
	const [guestSelected, setGuestSelected] = useState('');
	const [cabinSelected, setCabinSelected] = useState('');

	const { guests, isLoading: isLoadingGuests } = useGuests();

	const { cabins, isLoading: isLoadingCabins } = useCabins();

	const { handleSubmit } = useForm();

	if (isLoadingGuests || isLoadingCabins) return <Spinner />;

	function onSubmit(data) {
		console.log(data);
	}

	const handleChangeGuest = (evt) => {
		setGuestSelected(evt.target.value);
	};

	const handleChangeCabin = (evt) => {
		setCabinSelected(evt.target.value);
	};

	const guestOptions = guests.map((guest) => ({
		value: guest.id,
		label: guest.fullName,
	}));

	const cabinOptions = cabins.map((cabin) => ({
		value: cabin.id,
		label: cabin.name,
	}));

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Guest">
				<Select
					options={guestOptions}
					value={guestSelected}
					type="white"
					onChange={handleChangeGuest}
				/>
			</FormRow>

			<FormRow label="Cabin">
				<Select
					options={cabinOptions}
					value={cabinSelected}
					type="white"
					onChange={handleChangeCabin}
				/>
			</FormRow>

			<FormRow label="Start date">
				<Input type="text" id="startDate" />
			</FormRow>

			<FormRow label="End date">
				<Input type="text" id="endDate" />
			</FormRow>

			<FormRow>
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button>Add new booking</Button>
			</FormRow>
		</Form>
	);
}

export default CreateBookingForm;
