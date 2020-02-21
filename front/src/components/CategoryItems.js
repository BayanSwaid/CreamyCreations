import React from 'react';
import '../page/Products/Products.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form, Button   , Col } from 'react-bootstrap';
import Modal from "./Model";
 


export default class CategoryItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],

      name: '',
      phone: '',
      date: '',
      catID: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value

    });
  }

  handleSubmit(event) {
    alert('Name: ' + this.state.name);
    alert('phone: ' + this.state.phone);
    alert('date: ' + this.state.date);
    event.preventDefault();
  }
  async componentDidMount() {

    //Products
    const response = await fetch(`http://localhost:8080/OrderByCatProducts/${this.state.catID}`);
    const result = await response.json();
    //Order
    // const responseO = await fetch(`http://localhost:8080/Orders/create/?date=${this.state.date}&username=${this.state.name}&userPhone=${this.state.phone}&Products_ID=1`);
    //const resultO = await responseO.json();

    this.setState({

      products: result, error: "none",

      modal: false,
      name: "",
      modalInputName: ""
    })

  }





  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false
    });
  }



  render() {

    return (
      <>
        <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>

          <form onSubmit={this.handleSubmit}>



            <Form.Group  >
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" value={this.state.name1} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group  >
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" tybe="number" value={this.state.phone} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group >
              <Form.Label>Date</Form.Label>
              <Form.Control name="date" tybe="date" value={this.state.date} onChange={this.handleChange} />
            </Form.Group>

            {/* <input type="date" name="date" value={this.state.date} onChange={this.handleChange} /> */}

            <Button variant="danger" size="lg" block="block" type="submit">
              Create Order
        </Button>
          </form>

        </Modal>
        {
          this.state.products.map((product, index) => (
            <Col calssName="col cl" sm>
              <div className="flip-box">
                <div className="flip-box-inner">
                  <div className="flip-box-front">
                    <img className="ImagePr" src={`/Image/${product.proImg}`} alt="Paris" />
                  </div>
                  <div className="flip-box-back">
                    <h2 className='topicPro'>Akram</h2>
                    <p><span>Name:</span> {product.name}</p>
                    <p><span>Description:</span> {product.description}</p>
                    <p><span>Price:</span> {product.price} $</p>
                    {/* <p><span>Price:</span> {props.value.Categories_ID} $</p> */}
                    <Button className='add add2' size="lg" onClick={e => this.modalOpen(e)} variant="danger">Add new product</Button>
                  </div>
                </div>
              </div>

            </Col>

          ))
        }
      </>
    )
  }
}
