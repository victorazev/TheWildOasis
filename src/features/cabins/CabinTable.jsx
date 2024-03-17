import { useCabins } from './useCabins';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';

function CabinTable() {
	const { isLoading, cabins, count } = useCabins();

	if (isLoading) return <Spinner />;

	if (!cabins.length) return <Empty resourceName="cabins" />;

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={cabins}
					render={(cabin) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>

			<Table.Footer>
				<Pagination count={count} type={DEFAULT_PAGE_SIZE} />
			</Table.Footer>
		</Menus>
	);
}

export default CabinTable;
