import "../css/Loading.css";
import { Container } from 'react-bootstrap';

const Loading = () => {
    return (
        <Container className='loading'>
            <svg className="circular-loader"viewBox="25 25 50 50" >
                <circle className="loading-circle" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" />
            </svg>
        </Container>
    );
}

export default Loading;