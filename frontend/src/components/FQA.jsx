import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card, Button } from 'react-bootstrap';

const FQA = () => {
  return (
    <>

    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Some Question 1
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <strong>Answer Question</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dignissimos fugit ea amet, deserunt id quis libero beatae sit distinctio natus deleniti voluptates quaerat consequuntur nemo! Odio modi in labore.
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      {/* Add more accordion items as needed */}
    </Accordion>


    </>
  )
}

export default FQA