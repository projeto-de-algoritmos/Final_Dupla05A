import React, { useEffect, useState } from 'react'

// Api
import { airportApi, url } from '../../services/airports';

// Utils
import { dijkstra } from '../../utils/dijkstra';
import { hashAirports } from '../../utils/buildGraph';

// Style
import { Form, FormGroup, Button, Input, Col, Row, Alert } from 'reactstrap';
import './styles.css';

const Search = ({ airportsPath }) => {
  
    const [airports, setAirports] = useState([]);
    const [departure, setDeparture] = useState(50);
    const [arrival, setArrival] = useState(50);
    const [equal, setEqual] = useState(false);

    const fetch = async () => {
        const response = await airportApi.get(url);
        setAirports(response.data);
    }

    useEffect(() => { fetch() }, []);
    
    const handleSubmit = () => {

        if(departure !== -1 && arrival !== -1) {
           const path = dijkstra(airports, departure, arrival);
           airportsPath({ path, hashAirports: hashAirports(airports) });
        }
    }

    return (
        <div className="background">
        <div className="container">
            <h2 className="text"> Cadê meu vôo? </h2>
            <Form onSubmit={(e) =>{
                e.preventDefault();
                if(departure === arrival) {
                    setEqual(true);
                } else {
                    handleSubmit();
                }
            }} style={{ width: "50%"}}>
                <Row form >
                    <Input 
                        onChange={(event) => {
                            setDeparture(event.target.value);
                        }}
                        type="select"
                        label="partida"
                        name="departure" 
                        value={departure}
                        id="departure"
                        required={true} 
                        placeholder="Origem..." >
                        {
                            airports.length && airports.map((airport, index) => 
                            (  
                                <option key={index} value={airport['Airport ID']}>
                                    {`${airport['City']} - ${ airport['Country']}`}
                                </option>
                            )
                        )   
                        }
                    </Input>
                    <Input 
                        onChange={(event) => {
                            setArrival(event.target.value);
                        }} 
                        style={{
                            marginTop: '5%'
                        }}
                        type="select" 
                        name="arrival"
                        required={true} 
                        value={arrival}
                        id="arrival" 
                        placeholder="Origem..." >
                        {
                            airports.length && airports.map((airport, index) => 
                            (
                                <option key={index} value={airport['Airport ID']}>
                                    {`${airport['City']} - ${ airport['Country']}`}
                                </option>
                            )
                        )   
                        }
                    </Input>
                </Row>
                <Button 
                    style={{
                        marginTop: '5%',
                        padding: '10px 40px'
                    }}
                    color="success" >Pegar vôo
                </Button>
                {
                    equal && (
                        <Alert style={{
                            width: '50%',
                            marginLeft: '25%',
                            marginTop: '3%'
                        }} color="danger">
                            Selecione cidades diferentes
                        </Alert>
                    )
                }
                
            </Form>
        </div>
        </div>
    )
}

export default Search;
export { Search };