import Heading from '../ui/Heading';
import Row from '../ui/Row';
import GuestsTable from '../features/guests/guestsTable';
import AddGuest from '../features/guests/AddGuest';

function Guests() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All guests</Heading>
			</Row>

			<GuestsTable />
			<AddGuest />
		</>
	);
}

export default Guests;
