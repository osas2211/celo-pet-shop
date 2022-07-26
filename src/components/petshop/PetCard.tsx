import React from "react";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";

export interface petDetails{
	id: string,
	petName: string,
	imageURL: string,
	age: string,
	breed: string,
	location: string,
	adopted: boolean,
	adopter: string,
}

interface Props {
  pet: petDetails,
  adopt: Function,
  fee: string
}


const Pet:React.FC<Props> = ({ pet, adopt, fee }) => {
  const trigger = () => {
    adopt(pet.id);
  };

  return (
    <Col key={pet.id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{pet.adopter}</span>
            <Badge bg="secondary" className="ms-auto">
              {pet.adopted}
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={pet.imageURL} alt={pet.petName} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{pet.petName}</Card.Title>
          <Card.Text className="flex-grow-1 ">{pet.breed}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{pet.location}</span>
          </Card.Text>
          <Button
            variant="outline-dark"
            onClick={trigger}
            className="w-100 py-3"
          >
            Buy for {utils.format.formatNearAmount(fee)} NEAR
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Pet;