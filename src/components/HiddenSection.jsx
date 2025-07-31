import { Button, Col, Container, Row, Card } from 'react-bootstrap'
import { useState } from 'react'

const HiddenSection = () => {
  const [show, setShow] = useState(false)

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h2>Componente da testare</h2>
          <div>
            <Button
              variant="success"
              onClick={() => {
                setShow(!show)
              }}
            >
              {show ? 'NASCONDI' : 'MOSTRA'}
            </Button>
          </div>
          {show && (
            <Card className="mt-3">
              <Card.Img
                variant="top"
                alt="gattino"
                src="https://placecats.com/500/500"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default HiddenSection
