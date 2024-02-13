import { useGuests } from './useGuests';

import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';
import GuestsRow from './GuestsRow';

function GuestsTable() {
	const { guests, isLoading } = useGuests();

	if (isLoading) return <Spinner />;

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

			{/* <Table.Footer>
				<Pagination count={count} />
			</Table.Footer> */}
		</Menus>
	);
}

export default GuestsTable;
