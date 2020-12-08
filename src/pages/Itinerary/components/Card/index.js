import React, { useState } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

// Components
import { ModalFlights } from '../Modal';

const CardItinerary = ({ place }) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
    <div style={{ width: '100%' }} >
      <Card>
        <CardImg style={{ width: '100%', height: '100%' }} src="https://images.unsplash.com/photo-1543159821-9161ad7d5682?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80" alt="Card image cap" />
        <CardBody>
          <CardTitle style={{ fontWeight: 'bold' }} > { place.start.City } ({ place.start.Country }) para  ({ place.end.City } { place.end.Country }) </CardTitle>
          <CardSubtitle>Rota dos aeroportos</CardSubtitle>
          <CardText> Voos de  { place.start.Name } para { place.end.Name } </CardText>
          <Button onClick={toggle} color="success" >Passagens</Button>
        </CardBody>
      </Card>

      <ModalFlights place={place} toggle={toggle} modal={modal} />
    </div>
  );
};

export default CardItinerary;
export { CardItinerary };