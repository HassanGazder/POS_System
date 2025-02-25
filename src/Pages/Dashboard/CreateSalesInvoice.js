import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Button,
  Table,
  Modal,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import html2pdf from "html2pdf.js";

const CreateSalesInvoice = ({ transactions }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    if (!modal) {
      setSelectedTransaction(null);
      setError("");
      setSerialNumber("");
    }
  }, [modal]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSearchTransaction = () => {
    const transaction = transactions.find(
      (t) => String(t.S_No) === serialNumber
    );
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
    html2pdf().from(printRef.current).save("sales_invoice.pdf");
  };

  return (
    <React.Fragment>
      <Button color="primary" size="sm" onClick={toggleModal}>
      <i className="mdi mdi-plus-circle me-2"></i> Create Sales Invoice
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
                <Col sm={6}>
                  <h5 className="fw-bold">Umar Pharma (Pvt) Limited</h5>
                  <p>{selectedTransaction.CompleteAddress}</p>
                </Col>
                <Col sm={6} className="text-md-end text-center">
                  <h2>SALES INVOICE</h2>
                  <p>ACC No: {selectedTransaction.Invoice_Number}</p>
                </Col>
              </Row>

              {/* Customer and Invoice Details */}
              <div className="border p-3 mb-3">
                <Row>
                  <Col sm={6}>
                    <p><strong>Customer Name:</strong> {selectedTransaction.Care_Of}</p>
                    <p><strong>Tax ID:</strong> {selectedTransaction.S_No}</p>
                    <p><strong>Address:</strong> {selectedTransaction.CompleteAddress}</p>
                  </Col>
                  <Col sm={6} className="text-md-end text-center">
                    <p><strong>Sales Person:</strong> {selectedTransaction.SR_Name}</p>
                    <p><strong>Date:</strong> {selectedTransaction.Delivery_Date}</p>
                    <p><strong>Payment Due Date:</strong> {selectedTransaction.Delivery_Date}</p>
                    <p><strong>Customer PO:</strong> {selectedTransaction.Care_Of}</p>
                    <p><strong>Customer PO Date:</strong> {selectedTransaction.Delivery_Date}</p>
                  </Col>
                </Row>
              </div>

              {/* Items Table (Responsive) */}
              <div className="table-responsive">
                <Table bordered className="text-center">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedTransaction.S_No}</td>
                      <td>{selectedTransaction.product}</td>
                      <td>{selectedTransaction.DoctorName}</td>
                      <td>{selectedTransaction.SR_Name}</td>
                      <td>{selectedTransaction.Amount}</td>
                      <td>{selectedTransaction.Delivery_Date}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* Totals Section */}
              <Row className="mt-3">
                <Col sm={6}>
                  <p><strong>Total Quantity:</strong> {selectedTransaction.QtxSale}</p>
                  <p><strong>Tax on Sales:</strong> {selectedTransaction.QtxSale}</p>
                  <p><strong>Additional Discount:</strong> {selectedTransaction.QtxSale}</p>
                </Col>
                <Col sm={6} className="text-md-end text-center">
                  <p><strong>Total:</strong> {selectedTransaction.Amount}</p>
                  <p><strong>Grand Total:</strong> {selectedTransaction.Amount}</p>
                  <p><strong>Rounded Total:</strong> {selectedTransaction.Amount}</p>
                  <p><strong>Amount in Words:</strong> {selectedTransaction.Amount}</p>
                </Col>
              </Row>

              {/* Warranty, Notes, and Terms Section */}
              <Row className="mt-3 border-top pt-3">
                <Col sm={6}>
                  <h6>Warranty</h6>
                  <p>
                    Dummy warranty text: This product comes with a standard
                    warranty covering manufacturing defects.
                  </p>
                  <h6>Notes</h6>
                  <p>
                    Dummy notes text: Please review the invoice carefully and
                    contact us for any discrepancies.
                  </p>
                </Col>
                <Col sm={6} className="text-md-end text-center">
                  <h6>Terms</h6>
                  <p>
                    Dummy terms text: Payment is due within 30 days of invoice
                    date. Late payments may incur additional fees.
                  </p>
                </Col>
              </Row>

            </div>
          )}
        </div>

        {/* Modal Footer (Responsive Buttons) */}
        <div className="modal-footer d-flex flex-wrap justify-content-center">
          <Button color="secondary" onClick={toggleModal} className="m-1 w-100 w-md-auto">Close</Button>
          {selectedTransaction && (
            <>
              <Button color="danger" onClick={handleDownloadPDF} className="m-1 w-100 w-md-auto">Download PDF</Button>
              <Button color="primary" onClick={handlePrint} className="m-1 w-100 w-md-auto">Print Invoice</Button>
            </>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CreateSalesInvoice;
