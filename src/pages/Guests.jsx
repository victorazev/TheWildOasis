import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Guests() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All guests</Heading>
				<p>
					Show: name, nattionality, current bookings, check
					bookings historic
				</p>
			</Row>

			<Row>
				<Button>Add new guest</Button>
			</Row>
		</>
	);
}

export default Guests;
