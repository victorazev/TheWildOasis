/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';

import { useGuests } from '../guests/useGuests';
import { useCabins } from '../cabins/useCabins';
import { useCreateBooking } from './useCreateBooking';
import { useSettings } from '../settings/useSettings';

import { formatCurrency } from '../../utils/helpers';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import Select from '../../ui/Select';
import DatePickerRow from '../../ui/DatePickerRow';
import Checkbox from '../../ui/Checkbox';

function CreateBookingForm({ onCloseModal }) {
	const [options, setOptions] = useState([]);
	const [isSelectedCabin, setIsSelectedCabin] = useState(false);

	const { guests, isLoading: isLoadingGuests } = useGuests();

	const { cabins, isLoading: isLoadingCabins } = useCabins();

	const { settings, isLoading: isLoadingSettings } =
		useSettings();

	const { createBooking, isCreating } = useCreateBooking();

	const { handleSubmit, control, setValue, getValues, watch } =
		useForm({
			defaultValues: {
				guestId: '',
				cabinId: '',
				numGuests: '',
				startDate: null,
				endDate: null,
			},
		});

	const watchAllFields = watch();

	if (isLoadingGuests || isLoadingCabins || isLoadingSettings)
		return <Spinner />;

	const guestOptions = guests.map((guest) => ({
		value: guest.id,
		label: guest.fullName,
	}));

	const cabinOptions = cabins.map((cabin) => ({
		value: cabin.id,
		label: cabin.name,
	}));

	function handleChangeCabin(evt) {
		setValue('cabinId', evt.target.value);

		let numGuests = [];

		const selectedCabin = cabins.filter(
			(cabin) => cabin.id == evt.target.value,
		);
		const maxNumGuests = selectedCabin[0].maxCapacity;
		const minGuests = Math.ceil(maxNumGuests / 2);

		for (let i = minGuests; i <= maxNumGuests; i++) {
			numGuests.push(i);
		}

		const totalGuestOptions = numGuests.map((num) => ({
			value: num,
			label: num,
		}));

		setOptions(totalGuestOptions);
		setIsSelectedCabin(true);
	}

	function handleChangeGuests(evt) {
		setValue('numGuests', evt.target.value);
	}

	function onSubmit(data) {
		const numNights = differenceInDays(
			data.endDate,
			data.startDate,
		);

		const selectedCabin = cabins.filter(
			(cabin) => cabin.id == data.cabinId,
		);

		const cabinPrice =
			numNights * selectedCabin[0].regularPrice -
			numNights * selectedCabin[0].discount;

		const extrasPrice =
			differenceInDays(
				getValues('endDate'),
				getValues('startDate'),
			) *
			getValues('numGuests') *
			settings.breakfastPrice;

		const totalPrice = cabinPrice + extrasPrice;

		const newBooking = {
			...data,
			totalPrice,
			cabinPrice,
			numNights,
			extrasPrice,
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
					render={({ field: { value } }) => (
						<Select
							options={cabinOptions}
							value={value}
							type="white"
							onChange={(evt) => {
								handleChangeCabin(evt);
							}}
							disabled={isCreating}
						/>
					)}
				/>
			</FormRow>

			<FormRow label="Total of guests">
				<Controller
					name="numGuests"
					control={control}
					render={({ field: { value } }) => (
						<Select
							options={options}
							value={value}
							type="white"
							onChange={(evt) => {
								handleChangeGuests(evt);
							}}
							disabled={isCreating || !isSelectedCabin}
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

			<FormRow label="Breakfast">
				<Controller
					name="hasBreakfast"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Checkbox
							checked={value}
							onChange={onChange}
							disabled={isCreating}
						>
							<p>
								Add breakfast for{' '}
								{formatCurrency(settings.breakfastPrice)} per
								guest?
								{watchAllFields.numGuests != '' &&
								watchAllFields.endDate != null &&
								watchAllFields.startDate != null
									? ` Total of ${formatCurrency(
											differenceInDays(
												watchAllFields.endDate,
												watchAllFields.startDate,
											) *
												watchAllFields.numGuests *
												settings.breakfastPrice,
									  )}`
									: ''}
							</p>
						</Checkbox>
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
