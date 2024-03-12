import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function GuestTableOperations() {
	return (
		<TableOperations>
			{/* Filters to apply in future:
        <Filter
				filterField="status"
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'active', label: 'Active user' },
					{ value: 'inactive', label: 'Inactive user' },
				]}
			/> */}

			<SortBy
				options={[
					{
						value: 'fullName-asc',
						label: 'name (A-Z)',
					},
					{
						value: 'fullName-desc',
						label: 'name (Z-A)',
					},
					{
						value: 'nationality-asc',
						label: 'nationality (A-Z)',
					},
					{
						value: 'nationality-desc',
						label: 'nationality (Z-A)',
					},
					{
						value: 'createdAt-desc',
						label: 'newer user',
					},
					{
						value: 'createdAt-asc',
						label: 'older user',
					},
				]}
			/>
		</TableOperations>
	);
}

export default GuestTableOperations;
