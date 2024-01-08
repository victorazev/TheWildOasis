import { useSearchParams } from 'react-router-dom';
import Select from './Select';

/* eslint-disable react/prop-types */
function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get('sortBy') || '';

	function handleChange(evt) {
		searchParams.set('sortBy', evt.target.value);
		setSearchParams(searchParams);
	}

	return (
		<>
			<label>Sort by</label>
			<Select
				options={options}
				value={sortBy}
				type="white"
				onChange={handleChange}
			/>
		</>
	);
}

export default SortBy;
