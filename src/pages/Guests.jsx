import Heading from '../ui/Heading';
import Row from '../ui/Row';
import GuestTableOperations from '../features/guests/GuestTableOperations';
import GuestsTable from '../features/guests/GuestsTable';
import AddGuest from '../features/guests/AddGuest';

function Guests() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All guests</Heading>
				<GuestTableOperations />
			</Row>

			<GuestsTable />
			<AddGuest />
		</>
	);
}

export default Guests;
