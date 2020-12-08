import React, { useEffect, useState } from 'react'


// Services
import { flightApi, url } from '../../services/flights';

// Components
import { CardItinerary } from './components/Card';

// Reactstrap
import { Spinner, Jumbotron, Container } from 'reactstrap';

// Styles
import './styles.css';

const Itinerary = ({ itinerary }) => {

  const [places, setPlaces] = useState([]);

  console.log(places);

  const fetch = async (start, end) => {
    const res = await flightApi.get(`${url}&dep_icao=${start}&arr_icao=${end}&limit=10`);
    return res.data;
  }

  const getFlights = async () => {

    let p = [];
    for(let i = 0; i < itinerary.length -1; i++) {
      let flight = await fetch(itinerary[i].ICAO, itinerary[i+1].ICAO);
      p.push({ start: itinerary[i], end: itinerary[i+1], flights: flight.data });
    }
    setPlaces(p);
  }

  useEffect(() => {
    getFlights();
  },[]);

  console.log(places);

  return (
    <div className="container">
        <div>
        {
          places.length && (
            <Jumbotron fluid>
              <Container fluid>
                <h1 className="display-3">Escala Aérea</h1>
                <p className="lead"> Para ir de { places[0].start.City } localizado em { places[0].start.Country } até { places[places.length-1].end.City } localizado em {places[places.length-1].end.Country}, é necessário fazer escala em { places.length } aeroportos. Seguem abaixo as opções disponíveis para cada escala até o destino final. </p>
              </Container>
            </Jumbotron>
          )
        }
      </div>
        <div style={{ display: "flex", width: "100%" }}>
          {
            places.length? (
              places.map(place => (
                <div style={{ margin: "2%" }}>
                  <CardItinerary place={place} />
                </div>
              ))
            ): (
              <div style={{ marginTop: '30%', width: '100%' }}>
                <Spinner color="success" style={{ width: '20rem', height: '20rem' }} />{' '}
              </div>
            )
          }
        </div>
    </div>
  )
}

export default Itinerary;
export { Itinerary };