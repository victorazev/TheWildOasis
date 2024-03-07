/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { Controller, useForm } from 'react-hook-form';

import { UseCreateGuest } from './UseCreateGuest';
import { countryListAllIsoData } from '../../data/countries';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';

const nationalityOptions = countryListAllIsoData.map(
	(country) => ({
		value: country.name,
		label: country.name,
	}),
);

function CreateGuestForm({ onCloseModal }) {
	const { isCreatingGuest, createGuest } = UseCreateGuest();

	const { handleSubmit, reset, formState, control } = useForm();

	const { errors } = formState;

	console.log(errors);

	function onSubmit(data) {
		const selectedCountry = countryListAllIsoData.find(
			(country) => country.name === data.nationality,
		);
		const countryFlag = `https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`;

		createGuest(
			{ ...data, countryFlag },
			{
				onSuccess: () => {
					reset();
					onCloseModal?.();
				},
			},
		);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow
				label="Full name"
				error={
					errors.fullName
						? 'The guest field is required to add a guest'
						: ''
				}
			>
				<Controller
					name="fullName"
					control={control}
					rules={{
						required: true,
						pattern: /(?![\s.]+$)[A-Z][a-zA-Z]+.*[\s\.]*$/,
					}}
					render={({ field: { onChange, value } }) => (
						<Input
							type="text"
							id="fullName"
							disabled={isCreatingGuest}
							value={value}
							onChange={onChange}
						/>
					)}
				/>
			</FormRow>

			<FormRow
				label="Email"
				error={
					errors.email
						? 'The guest field is required to add a guest'
						: ''
				}
			>
				<Controller
					name="email"
					control={control}
					rules={{
						required: true,
						pattern:
							/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
					}}
					render={({ field: { onChange, value } }) => (
						<Input
							type="text"
							id="email"
							disabled={isCreatingGuest}
							value={value}
							onChange={onChange}
						/>
					)}
				/>
			</FormRow>

			<FormRow
				label="Nationality"
				error={
					errors.nationality
						? 'The guest field is required to add a guest'
						: ''
				}
			>
				<Controller
					name="nationality"
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, value } }) => (
						<Select
							id="nationality"
							style={{
								maxWidth: '23.2rem',
								padding: '0.8rem 0.8rem',
							}}
							options={nationalityOptions}
							disabled={isCreatingGuest}
							value={value}
							onChange={onChange}
						/>
					)}
				/>
			</FormRow>

			<FormRow
				label="National ID"
				error={
					errors.nationalID
						? 'The guest field is required to add a guest'
						: ''
				}
			>
				<Controller
					name="nationalID"
					control={control}
					rules={{
						required: true,
						pattern: /^[a-zA-Z0-9]{6,12}$/,
					}}
					render={({ field: { onChange, value } }) => (
						<Input
							type="text"
							id="nationalID"
							disabled={isCreatingGuest}
							value={value}
							onChange={onChange}
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
				<Button disabled={isCreatingGuest}>
					Create new guest
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateGuestForm;
