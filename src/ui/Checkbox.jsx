/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledCheckbox = styled.div`
	display: flex;
	gap: 1.6rem;

	& input[type='checkbox'] {
		cursor: pointer;
		height: 2.4rem;
		width: 2.4rem;
		outline-offset: 2px;
		transform-origin: 0;
		transition: 200ms;
		accent-color: var(--color-brand-600);
	}

	& input[type='checkbox']:not(:checked):not(:disabled) {
		appearance: none;
		background: var(--color-grey-50);
		border-radius: 5px;
	}

	& input[type='checkbox']:disabled {
		accent-color: var(--color-brand-600);
	}

	& label {
		flex: 1;

		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
`;

function Checkbox({
	checked,
	onChange,
	disabled = false,
	id,
	children,
}) {
	return (
		<StyledCheckbox>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<label htmlFor={!disabled ? id : ''}>{children}</label>
		</StyledCheckbox>
	);
}

export default Checkbox;
