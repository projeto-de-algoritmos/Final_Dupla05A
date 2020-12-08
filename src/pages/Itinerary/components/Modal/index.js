/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { mergeSort } from '../../../../utils/mergeSort';


const ModalFlights = ({ place, modal, toggle }) => {

    const [sortedFlight, setSortedFlight] = useState([]);

    useEffect(() => {
        if(place.flights.length) {
            const aux = mergeSort(place.flights);
            setSortedFlight(aux);
        }
    }, []);
    

    return (
        <div>
        <Modal isOpen={modal} toggle={toggle} className="fasd">
            <ModalHeader toggle={toggle}>
                Lista de vôos mais recentes de { place.start.City } { " para " } { place.end.City }
            </ModalHeader>
            <ModalBody>
            {
                sortedFlight.length? (
                    sortedFlight.map(flight => (
                        <div style={{ alignItems: 'center', textAlign: 'center' }} >
                            <h3> Compahia Aérea: {flight.airline.name} </h3>
                            <p> Data do Vôo: {new Date(flight.flight_date).toLocaleString('pt-br')} </p>
                            <p> Aeroporto de origem: {flight.departure.airport} </p>
                            <p> Aeroporto de destino: {flight.arrival.airport} </p>
                            <Button  disabled={true} color="success" > Comprar passagem </Button>
                            <br/><br/><br/>
                        </div>
                    ))
                ):(
                    <p style={{ color: 'red', fontWeight: 'bold' }}> Não há vôos marcados no momento </p>
                )
            }
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </div>
    );
}

export default ModalFlights;
export { ModalFlights };