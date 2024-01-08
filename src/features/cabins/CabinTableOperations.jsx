import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
	return (
		<div>
			<TableOperations>
				<Filter
					filterField="discount"
					options={[
						{ value: 'all', label: 'All' },
						{ value: 'no-discount', label: 'No discount' },
						{ value: 'with-discount', label: 'With discount' },
					]}
				/>
				<SortBy
					options={[
						{
							value: 'name-asc',
							label: 'name ascending',
						},
						{
							value: 'name-desc',
							label: 'name descending',
						},
						{
							value: 'regularPrice-asc',
							label: 'price ascending',
						},
						{
							value: 'regularPrice-desc',
							label: 'price descending',
						},
						{
							value: 'maxCapacity-asc',
							label: 'capacity ascending',
						},
						{
							value: 'maxCapacity-desc',
							label: 'capacity descending',
						},
					]}
				/>
			</TableOperations>
		</div>
	);
}

export default CabinTableOperations;
