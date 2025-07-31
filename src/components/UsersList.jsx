import { Col, Container, Form, ListGroup, Row, Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const UsersList = () => {
  const [arrayOfUsers, setArrayOfUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('errore risposta API')
        }
      })
      .then((users) => {
        console.log('users', users)
        setArrayOfUsers(users)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log('ERRORE', err)
        setIsLoading(false)
      })
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h2 className="my-3">LISTA UTENTI</h2>
          <div>
            <Form.Control
              type="text"
              placeholder="Cerca un utente"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
          </div>
          {isLoading && (
            <div className="text-center mb-3">
              <Spinner
                animation="border"
                variant="success"
                data-testid="spinner"
              />
            </div>
          )}
          <ListGroup>
            {arrayOfUsers
              .filter((u) => {
                // if (u.name.toLowerCase().includes(search.toLowerCase())) {
                //   return true
                // } else {
                //   return false
                // }
                return u.name.toLowerCase().includes(search.toLowerCase())
              })
              .map((u) => {
                return (
                  <ListGroup.Item key={u.id} data-testid="list-user">
                    {u.name} - {u.phone}
                  </ListGroup.Item>
                )
              })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default UsersList
