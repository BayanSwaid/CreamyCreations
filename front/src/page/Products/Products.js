import React from 'react';
import '../Products/Products.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, MenuItem, Button, ButtonToolbar, DropdownButton, SplitButton, Container, Row, Col, FormControl, Nav, thumbnail, Table, Image } from 'react-bootstrap';
import Modal from "../../components/Model";
// import ImageGallery from 'react-image-gallery';
import CategoryItems from '../../components/CategoryItems'

export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: "",
      modalInputName: "",
      // Products: [],
      Categories: [],
      Cate: [],
      Images: []
    };
  }

  async componentDidMount() {
    /* //Products
    const response = await fetch('http://localhost:8080/Products/');
    const result = await response.json();
    console.log(result); */
    //Gategories
    const responseG = await fetch('http://localhost:8080/Categories/');
    const resultG = await responseG.json();
    console.log(resultG);
    //ProductsImage
    const responseI = await fetch('http://localhost:8080/ProductImages/');
    const resultI = await responseI.json();
    console.log(resultI);
    //CatIDPro
    const responseID = await fetch('http://localhost:8080/CatIDPro/');
    const resulta = await responseID.json();
    console.log(resulta);
    this.setState({
/*       Products: result, error: "none",
 */      Categories: resultG, error: "none",
      Cate: resulta, error: "none",
      Images: resultI, error: "none"
    });


  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    this.setState({ name: this.state.modalInputName });
    this.modalClose();
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
      <div>

        <Modal className="formm" show={this.state.modal} handleClose={e => this.modalClose(e)}>
          <br />
          <div className="form-group ">
            <label>Enter Name:</label>
            <input
              type="text"
              value={this.state.modalInputName}
              name="modalInputName"
              onChange={e => this.handleChange(e)}
              className="form-control"
            />
            <label>Enter Phone:</label>
            <input
              type="text"
              value={this.state.modalInputName}
              name="modalInputName"
              onChange={e => this.handleChange(e)}
              className="form-control"
            />
            <label>Enter Date:</label>
            <input
              type="text"
              value={this.state.modalInputName}
              name="modalInputName"
              onChange={e => this.handleChange(e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <Button className="modal-close" onClick={e => this.handleSubmit(e)}>
              Submit
          </Button>
          </div>
        </Modal>



        <Container>
          {this.state.Images.map((image) => (
            <p>{image.path}</p>
          ))}
          <div>


            <Row>

              {this.state.Categories.map((cat, index) => (

                <div>

                  <h1 className="topicPro">{this.state.catName}</h1>
                  <CategoryItems
                    value={cat.ID}
                    key={index} />
                </div>

              ))}

            </Row>
          </div>


        </Container>
        <div />
      </div>)
  }
}