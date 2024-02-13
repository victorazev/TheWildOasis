import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import GuestsTable from '../features/guests/guestsTable';

function Guests() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All guests</Heading>
			</Row>

			<GuestsTable />

			<Button>Add new guest</Button>
		</>
	);
}

export default Guests;
