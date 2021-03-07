import React from 'react';
import './App.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
import axios from 'axios';
import { Table } from 'react-bootstrap';

type State = {
  showModal: boolean;
  text: string;
  selected: string;
  radio: string;
  textarea: string;
  checked: boolean;
  searchedText: string;
}
type Detail = {
  text: string;
  selection: number;
  radio: string;
  textarea: string;
  checked: boolean
}
const URL = 'http://127.0.0.1:8000/'
class App extends React.Component<{}, State>{
  private searchedResult: Detail[];

  constructor(props: any) {
    super(props);
    this.searchedResult = [];
    this.state = {
      showModal: false,
      text: '',
      selected: '1',
      radio: 'default',
      textarea: '',
      checked: false,
      searchedText: '',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ showModal: true });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  getValue = () => {
    console.log(this.state);
    if(this.state.text !== '' && this.state.textarea !== '') {
      swal({
        title: 'Confirm Submission?',
        text: 'Are you sure you wish to submit these details?',
        icon: 'success'
      }).then((value) => {
        if(value) {
          axios.post(`${URL}demo/`, {
            text: this.state.text,
            selection: parseInt(this.state.selected),
            radio: this.state.radio,
            textarea: this.state.textarea,
            checked: this.state.checked
          }).then((response)=> {
            if(response.status === 200) {
              swal({
                title: 'Submission Success!',
                text: 'You\'ve successfully submitted the details',
                icon: 'success'
              }).then((value) => {
                // eslint-disable-next-line no-restricted-globals
                location.reload();
              })
            }
          }).catch((error) => {
            swal({
              title: 'Submission Failed!',
              text: 'Something weird happened, that\'s awkward',
              icon: 'error',
            })
          })
        }
      })
    }else{
      swal({
        title: 'Details incomplete!',
        text: 'Some fields are incomplete, please make sure all fields are filled properly',
        icon: 'error'
      })
    }
  }

  search = () => {
    if(this.state.searchedText !== '') {
      axios.get(`${URL}demo/search?searchText=${this.state.searchedText}`)
      .then((response) => {
        this.searchedResult = response.data;
        this.showModal();
      })
    }
  }

  updateText = (event: any) => {
    this.setState({ text: event.target.value });
  }

  updateSelection = (event: any) => {
    this.setState({ selected: event.target.value });
  }

  updateTextarea = (event: any) => {
    this.setState({ textarea: event.target.value });
  }

  updateRadio = (event:any) => {
    this.setState({ radio: event.target.value })
  }

  updateCheckbox = (event:any) => {
    this.setState({ checked: event.target.checked })
  }

  updateSearchText = (event:any) => {
    this.setState({ searchedText: event.target.value })
  }

  render() {
    return (
      <>
      <Modal show={this.state.showModal} onHide={this.hideModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Search Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.searchedResult.length > 0 ?
            <div className="table-wrapper">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Text</th>
                    <th>Selection</th>
                    <th>Radio</th>
                    <th>Textarea</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.searchedResult.map((result, index) => (
                    <tr key={index}>
                      <td>{result.text}</td>
                      <td>{result.selection}</td>
                      <td>{result.radio}</td>
                      <td>{result.textarea}</td>
                      <td style={{textAlign: "center"}}>
                        <Form.Check type="checkbox" checked={result.checked} disabled={true}/>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </Table>
            </div>
            : 
            <div className="no-result">
              <h3>No Results</h3>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.searchedText} onChange={this.updateSearchText}/>
            <Button variant="outline-success" onClick={this.search}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-5">
        <h1 className="mb-5">Test Form</h1>
        <Row>
          <Col>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Example Input Text</Form.Label>
              <Form.Control type="text" value={this.state.text} onChange={this.updateText}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Example select</Form.Label>
              <Form.Control as="select" value={this.state.selected} onChange={this.updateSelection}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Example Radio select</Form.Label>
              {["radio"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check 
                  type={type as FormCheckType}
                  name={`default-${type}`}
                  id={`default-${type}`}
                  label={`default ${type}`}
                  value="default"
                  checked={this.state.radio === "default"}
                  onChange={this.updateRadio}
                />

                <Form.Check
                  type={type as FormCheckType}
                  name={`default-${type}`}
                  label={`disabled ${type}`}
                  id={`disabled-default-${type}`}
                  value="disabled"
                  checked={this.state.radio === "disabled"}
                  onChange={this.updateRadio}
                />
              </div>
              ))}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} value={this.state.textarea} onChange={this.updateTextarea}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check this button to submit" checked={this.state.checked} onChange={this.updateCheckbox}/>
            </Form.Group>
          </Form>
          <div style={{textAlign: "right"}}>
            <Button variant="primary" onClick={this.getValue} disabled={!this.state.checked}>Submit</Button>
          </div>
          </Col>
        </Row>
      </Container>
    </>
    )
  }
}

export default App;
