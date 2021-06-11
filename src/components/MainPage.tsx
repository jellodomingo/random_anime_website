import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context';
import { getRandomSeasonalAnime, getAllSeasonsAvailable } from '../api/jikan';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Input } from 'reactstrap'
import { ReactComponent as Fall } from '../icons/autumn-leaf.svg';
import { ReactComponent as Spring } from '../icons/florist.svg';
import { ReactComponent as Summer } from '../icons/sun.svg';
import { ReactComponent as Winter } from '../icons/winter-snowman.svg';
import "../css/MainPage.css";

import Anime from './AnimePage';

const MainPage = () => {
    const appContext = useContext(AppContext);

    const [data, setData] = useState([]);

    const getYearData = async () => {
        const data = await getAllSeasonsAvailable();
        const archive = data.data.archive;
        setData(archive);
    }

    const getYearDropdown = () => {
        const dropdownOptions = data.map((yearData: any, index: number) => {
            return <option key={index} value={yearData.year}>{yearData.year}</option>
        });
        return dropdownOptions;
    }

    const seasonColor: { [key: string]: string } = {
        spring: 'colorSpring',
        summer: 'colorSummer',
        fall: 'colorFall',
        winter: 'colorWinter',
    };

    const colorSelected = (seasonIcon: string): string => {
        const { season } = appContext.appState;
        if(seasonIcon === season) {
            return seasonColor[season];
        } else {
            return 'normal'
        }
    }

    const handleSubmit = async () => {
        const { year, season } = appContext.appState;
        const data: any = await getRandomSeasonalAnime(year, season);

        if(data === undefined) {
            alert("No anime found");
        } else {
            appContext.setId(Number(data.mal_id));
            appContext.setPage(<Anime id={data.mal_id}/>)
        }
    }

    useEffect(() => {
        getYearData();
    }, []);

    return (
        <Container>
            <Row className="title">
                <h1>Random Anime Picker</h1>
            </Row>
            <Row>
                <Col sm={6}>
                    <Row className="seasons">
                        <h2>Seasons: </h2>
                    </Row>
                    <Row>
                        <Col>
                            <Winter 
                                className={colorSelected('winter')}
                                width='100%' 
                                height='100%'
                                onClick={() => appContext.setSeason('winter')}
                            />
                        </Col>
                        <Col>
                            <Spring  
                                className={colorSelected('spring')}
                                width='80%' 
                                height='100%' 
                                onClick={() => appContext.setSeason('spring')}
                            />
                        </Col>
                        <Col>
                            <Summer
                                className={colorSelected('summer')}
                                width='80%' 
                                height='100%'
                                onClick={() => appContext.setSeason('summer')}
                            />
                        </Col>
                        <Col>
                            <Fall 
                                className={colorSelected('fall')}
                                width='100%' 
                                height='100%'
                                onClick={() => appContext.setSeason('fall')}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row className="year">
                        <h2>Year: </h2>
                    </Row>
                    <Row className="year_selector">
                        <Input 
                            type="select"
                            onChange={(event) => {
                                appContext.setYear(Number(event.target.value))
                            }}
                        >
                            {getYearDropdown()}
                        </Input>
                    </Row>
                </Col>
            </Row>
            <Row className="button_container">
                    <Button
                        variant="dark"
                        size="lg"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Get Random Anime
                    </Button>
                </Row>
        </Container>
    );
}

export default MainPage;