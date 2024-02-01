/* eslint-disable react/prop-types */
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInBusinessDays } from 'date-fns';

import { useGuests } from '../guests/useGuests';
import { useCabins } from '../cabins/useCabins';
import { useCreateBooking } from './useCreateBooking';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import Select from '../../ui/Select';
import DatePickerRow from '../../ui/DatePickerRow';

function CreateBookingForm({ onCloseModal }) {
	const { guests, isLoading: isLoadingGuests } = useGuests();

	const { cabins, isLoading: isLoadingCabins } = useCabins();

	const { createBooking, isCreating } = useCreateBooking();

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
		const numNights = differenceInBusinessDays(
			data.endDate,
			data.startDate,
		);

		const selectedCabin = cabins.filter(
			(cabin) => cabin.id == data.cabinId,
		);

		const numGuests = selectedCabin[0].maxCapacity;

		const cabinPrice =
			numNights * selectedCabin[0].regularPrice -
			numNights * selectedCabin[0].discount;

		const hasBreakfast = false;
		const extrasPrice = 0;

		const totalPrice = cabinPrice + extrasPrice;

		const newBooking = {
			...data,
			numGuests,
			totalPrice,
			cabinPrice,
			numNights,
			extrasPrice,
			hasBreakfast,
			status: 'unconfirmed',
			isPaid: false,
			observations: '',
		};

		createBooking(newBooking);
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
							disabled={isCreating}
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
							disabled={isCreating}
						/>
					)}
				/>
			</FormRow>

			<DatePickerRow label="Pick the start date">
				<Controller
					control={control}
					name="startDate"
					render={({ field: { onChange, value } }) => (
						<DatePicker
							showIcon
							onChange={onChange}
							minDate={new Date()}
							selected={value}
							dateFormat="dd/MM/yyyy"
							disabled={isCreating}
						/>
					)}
				/>
			</DatePickerRow>

			<DatePickerRow label="Pick the end date">
				<Controller
					control={control}
					name="endDate"
					render={({ field: { onChange, value } }) => (
						<DatePicker
							showIcon
							onChange={onChange}
							minDate={new Date()}
							selected={value}
							dateFormat="dd/MM/yyyy"
							disabled={isCreating}
						/>
					)}
				/>
			</DatePickerRow>

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
