import { useGuests } from './useGuests';

import { GUESTS_SIZE } from '../../utils/constants';

import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';
import GuestsRow from './GuestsRow';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';

function GuestsTable() {
	const { guests, isLoading, count } = useGuests();

	if (isLoading) return <Spinner />;

	if (!guests.length) return <Empty resourceName="guests" />;

	return (
		<Menus>
			<Table columns="2.2fr 3fr 2fr 1.6rem">
				<Table.Header>
					<div>Full name</div>
					<div>Email</div>
					<div>Nationality</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={guests}
					render={(guest) => (
						<GuestsRow key={guest.id} guest={guest} />
					)}
				/>
			</Table>

			<Table.Footer>
				<Pagination count={count} type={GUESTS_SIZE} />
			</Table.Footer>
		</Menus>
	);
}

export default GuestsTable;
