import React from "react";
import { Button, Modal } from "react-bootstrap";

export default class ModalDeletar extends React.Component {

  // showModal = e => {this.setState({show: !this.state.show})}
  onClose = e => {
    this.props.onClose && this.props.onClose(e)
  }

  onExecute = e => {
    this.props.onExecute && this.props.onExecute(e)
    console.log(">>> onExecute no modal", this.props.callback )
    this.props.callback();
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <>
        <div>{this.props.children}</div>
        <button onClick={this.onClose} > Close</button>

        <Modal
          show={this.props.show}
          animation={true}
          size="md" className="shadow-lg border">
          <Modal.Header className="bg-danger text-white text-center py-1">
            <Modal.Title className="text-center">
              <h5>{this.props.title}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-0 border">
            {this.props.children}
          </Modal.Body>
          <Modal.Footer className="py-1 d-flex justify-content-center">
            <div>
              <Button
                variant="outline-dark" onClick={this.onClose}>Cancel</Button>
            </div>
            <div>
              <Button variant="outline-danger" onClick={this.onExecute} className="mx-2 px-3">Delete</Button>
            </div>
          </Modal.Footer>
        </Modal>

      </>
    )
  }
}



