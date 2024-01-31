/* eslint-disable react/prop-types */
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useGuests } from '../guests/useGuests';
import { useCabins } from '../cabins/useCabins';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import Select from '../../ui/Select';
import { differenceInBusinessDays } from 'date-fns';

function CreateBookingForm({ onCloseModal }) {
	const { guests, isLoading: isLoadingGuests } = useGuests();

	const { cabins, isLoading: isLoadingCabins } = useCabins();

	const { handleSubmit, control } = useForm({
		defaultValues: {
			guestId: '',
			cabinId: '',
		},
	});

	if (isLoadingGuests || isLoadingCabins) return <Spinner />;

	const guestOptions = guests.map((guest) => ({
		value: guest.id,
		label: guest.fullName,
	}));

	const cabinOptions = cabins.map((cabin) => ({
		value: cabin.id,
		label: cabin.name,
	}));

	function onSubmit(data) {
		// compute num nights, get cabin price, get extra prices
		// set status to unconfirmed, has breakfast to false, isPaid to false
		const numNights = differenceInBusinessDays(
			data.endDate,
			data.startDate,
		);

		const selectedCabin = cabins.filter(
			(cabin) => cabin.id == data.cabinId,
		);

		const totalPrice =
			numNights * selectedCabin[0].regularPrice -
			numNights * selectedCabin[0].discount;

		const extrasPrice = 0;
		const hasBreakfast = 'false';

		console.log(selectedCabin[0]);

		data = {
			...data,
			totalPrice,
			numNights,
			extrasPrice,
			hasBreakfast,
			status: 'unconfirmed',
			isPaid: 'false',
		};
		console.log(data);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Guest">
				<Controller
					name="guestId"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							options={guestOptions}
							value={value}
							type="white"
							onChange={onChange}
						/>
					)}
				/>
			</FormRow>

			<FormRow label="Cabin">
				<Controller
					name="cabinId"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							options={cabinOptions}
							value={value}
							type="white"
							onChange={onChange}
						/>
					)}
				/>
			</FormRow>

			<FormRow label="Pick the start date">
				<Controller
					control={control}
					name="startDate"
					render={({ field: { onChange, value } }) => (
						<DatePicker
							showIcon
							onChange={onChange}
							selected={value}
							dateFormat="dd/MM/yyyy"
						/>
					)}
				/>
			</FormRow>

			<FormRow label="Pick the end date">
				<Controller
					control={control}
					name="endDate"
					render={({ field: { onChange, value } }) => (
						<DatePicker
							showIcon
							onChange={onChange}
							selected={value}
							dateFormat="dd/MM/yyyy"
						/>
					)}
				/>
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
