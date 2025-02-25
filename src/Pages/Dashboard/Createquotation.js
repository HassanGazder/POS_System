import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Table, Modal, Input, FormGroup, Label } from "reactstrap";
import html2pdf from "html2pdf.js";

const CreateQuotation = ({ transactions }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    if (!modal) {
      setSerialNumber("");
      setSelectedTransaction(null);
      setError("");
    }
  }, [modal]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSearchTransaction = () => {
    const transaction = transactions.find((t) => String(t.S_No) === serialNumber);
    if (transaction) {
      setSelectedTransaction(transaction);
      setError("");
    } else {
      setError("Transaction not found for the entered Serial Number!");
    }
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleDownloadPDF = () => {
    html2pdf().from(printRef.current).save("quotation.pdf");
  };

  return (
    <React.Fragment>
      <Button color="primary" size="sm" onClick={toggleModal}>
        <i className="mdi mdi-plus-circle me-2"></i> Create Quotation
      </Button>

      <Modal isOpen={modal} toggle={toggleModal} size="lg" centered>
      <Button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={toggleModal}
          aria-label="Close"
        ></Button>

        <div className="p-4 w-100" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          {/* Serial Number Input */}
          <FormGroup>
            <Label for="serialNumber">Enter Serial Number</Label>
            <Input
              type="text"
              id="serialNumber"
              value={serialNumber}
              onChange={(e) => {
                setSerialNumber(e.target.value);
                setError("");
              }}
              placeholder="Enter S.No"
            />
          </FormGroup>
          <Button color="primary" onClick={handleSearchTransaction} className="mb-3 w-100">
            Search
          </Button>

          {/* Display error message */}
          {error && <p className="text-danger text-center">{error}</p>}

          {selectedTransaction && (
            <div ref={printRef}>

              {/* Header Section */}
              <Row className="border-bottom pb-3 mb-3">
                <Col sm={6}><h6 className="fw-bold">In charge Pharmacy</h6></Col>
                <Col sm={6} className="text-md-end text-center">
                  <p>{selectedTransaction.Delivery_Date}</p>
                </Col>
              </Row>

              <h3 className="text-center mb-4 fw-bold">Quotation</h3>

              {/* Quotation Details */}
              <div className="border p-3 mb-3">
                <p><strong>Hospital Name:</strong> {selectedTransaction.HospitalName}</p>
                <p><strong>Address:</strong> {selectedTransaction.CompleteAddress}</p>
                <p><strong>Subject:</strong> Perform By</p>
                <p>
                  Keeping in view the role of {selectedTransaction.HospitalName} in
                  managing the treatment of cancer patients, we are pleased to offer
                  you the best prices for the following medicines.
                </p>
              </div>

              {/* Items Table (Responsive) */}
              <div className="table-responsive">
                <Table bordered className="text-center">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Product</th>
                      <th>Product Description</th>
                      <th>Doctor Name</th>
                      <th>SR Name</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedTransaction.S_No}</td>
                      <td>{selectedTransaction.product}</td>
                      <td>{selectedTransaction.product}</td>
                      <td>{selectedTransaction.DoctorName}</td>
                      <td>{selectedTransaction.SR_Name}</td>
                      <td>{selectedTransaction.Amount}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* Footer Section */}
              <div className="mt-4 border-top pt-3">
                <p>It would be a matter of great honor for us to serve your institution.</p>
                <p>Looking forward.</p>
                <br/>
                <br/>

                <p>Thanks and Regards,</p>
                <br/>
                <br/>
                <br/>
                <br/>
                <p><strong>Rajab Ali</strong></p>
                <p>Oncostele Pharma</p>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer (Responsive Buttons) */}
        <div className="modal-footer d-flex flex-wrap justify-content-center">
          <Button color="secondary" onClick={toggleModal} className="m-1 w-100 w-md-auto">Close</Button>
          {selectedTransaction && (
            <>
              <Button color="primary" onClick={handlePrint} className="m-1 w-100 w-md-auto">Print Quotation</Button>
              <Button color="danger" onClick={handleDownloadPDF} className="m-1 w-100 w-md-auto">Download PDF</Button>
            </>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CreateQuotation;
