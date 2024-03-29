import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context";
import { getAnimeById } from "../api/jikan";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import "../css/AnimePage.css";
import { ReactComponent as Fall } from "../icons/autumn-leaf.svg";
import { ReactComponent as Spring } from "../icons/florist.svg";
import { ReactComponent as Summer } from "../icons/sun.svg";
import { ReactComponent as Winter } from "../icons/winter-snowman.svg";
import styled, { keyframes } from "styled-components";
import Loading from "./Loading";
import { CSSTransition } from "react-transition-group";
import ReactPlayer from "react-player/youtube";

import Main from "./MainPage";

interface ScoreCircleProps {
  score: number;
}

const ratingAnimation = (rating: number) => keyframes`
    to {
        stroke-dashoffset: ${rating};
    }
`;

const ScoreCircle = styled.circle<ScoreCircleProps>`
  stroke-dasharray: 251;
  stroke-dashoffset: 251;
  animation: ${(props) => ratingAnimation(props.score)} 0.5s linear forwards;
`;

interface Props {
  id: number;
}

const AnimePage = ({ id }: Props) => {
  const appContext = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<any>({});

  const getPercentForCircle = (rating: number) => {
    console.log(251 - 251 * (rating / 10));
    if (rating === 0) {
      return 0;
    }
    return 251 - 251 * (rating / 10);
  };

  const goBack = () => {
    appContext.setPage(<Main />);
  };

  const getSeason = (premiere: string) => {
    return premiere.split(" ")[0];
  };

  const getSeasonIcon = (season: string) => {
    switch (season.toLowerCase()) {
      case "spring":
        return <Spring width={50} height={50} fill="#35713B" />;
      case "summer":
        return <Summer width={50} height={50} fill="#A89220" />;
      case "fall":
        return <Fall width={50} height={50} fill="#A04F35" />;
      case "winter":
        return <Winter width={50} height={50} fill="#5798AD" />;
      default:
        return <h1>N/A</h1>;
    }
  };

  const getData = async () => {
    console.log(id);
    const data = await getAnimeById(id);
    setData(data.data.data);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="anime-page">
      <Container className="back-button-container">
        <Button variant="dark" onClick={() => goBack()}>
          {"< Back"}
        </Button>
      </Container>
      <CSSTransition
        in={loading}
        timeout={1000}
        classNames="loading"
        unmountOnExit
        onExit={() => setReady(true)}
      >
        <Loading />
      </CSSTransition>
      <CSSTransition in={ready} timeout={1000} classNames="data">
        <Container className="data">
          {ready && (
            <>
              <Row>
                <Col md={8}>
                  <Row>
                    <h1>{data.title}</h1>
                  </Row>
                  <Row className="stats">
                    <Col>
                      <Row className="episodes">
                        <h4>Episodes:</h4>
                      </Row>
                      <Row className="episodes">
                        <h1>{data.episodes ?? "N/A"}</h1>
                      </Row>
                    </Col>
                    <Col>
                      <Row className="seasons">
                        <h4>Seasons:</h4>
                      </Row>
                      <Row className="seasons">
                        <h1>
                          {getSeasonIcon(
                            data.season ? getSeason(data.season) : "??"
                          )}
                        </h1>
                      </Row>
                    </Col>
                    <Col>
                      <Row className="year">
                        <h4>Year:</h4>
                      </Row>
                      <Row className="year">
                        <h1>{data.year ? data.year : "??"}</h1>
                      </Row>
                    </Col>
                    <Col>
                      <Row className="score">
                        <svg height="100px" width="100px">
                          <ScoreCircle
                            score={getPercentForCircle(
                              data.score ? data.score : 0
                            )}
                            className="circle"
                            stroke="white"
                            strokeWidth="7"
                            fill="transparent"
                            transform="rotate(-90 50 50)"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <text
                            stroke="white"
                            fill="white"
                            textAnchor="middle"
                            fontSize="30px"
                            dy="0.05em"
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                          >
                            {data.score ? data.score : "???"}
                          </text>
                        </svg>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="synopsis-title">Synopsis:</Row>
                  <Row className="synopsis">{data.synopsis}</Row>
                </Col>
                <Col md={4} className="image-container">
                  <Image className="image" src={data.images.jpg.image_url} />
                </Col>
              </Row>
              <Row className="trailer">
                {data.trailer.url && (
                  <ReactPlayer url={data.trailer.embed_url} width="100%" />
                )}
              </Row>
            </>
          )}
        </Container>
      </CSSTransition>
    </div>
  );
};

export default AnimePage;
