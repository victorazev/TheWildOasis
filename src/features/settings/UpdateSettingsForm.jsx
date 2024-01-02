import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();

	const { isUpdating, updateSetting } = useUpdateSetting();

	function handleUpdate(evt, field) {
		const { value } = evt.target;
		if (!value) return;
		updateSetting({ [field]: value });
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					disabled={isUpdating}
					defaultValue={minBookingLength}
					onBlur={(evt) =>
						handleUpdate(evt, 'minBookingLength')
					}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					disabled={isUpdating}
					defaultValue={maxBookingLength}
					onBlur={(evt) =>
						handleUpdate(evt, 'maxBookingLength')
					}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					disabled={isUpdating}
					defaultValue={maxGuestsPerBooking}
					onBlur={(evt) =>
						handleUpdate(evt, 'maxGuestsPerBooking')
					}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					disabled={isUpdating}
					defaultValue={breakfastPrice}
					onBlur={(evt) => handleUpdate(evt, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
