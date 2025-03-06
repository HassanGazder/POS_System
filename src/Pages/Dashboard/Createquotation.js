import React, { useState, useRef, useContext } from "react";
import { Col, Row, Modal, Input, FormGroup, Label } from "reactstrap";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
// context api
import { DashboardContext } from "../../Pages/Dashboard/DashboardContext";
const CreateQuotation = ({ onClose }) => {
  const {transactions} =useContext(DashboardContext);
  const [serialNumbers, setSerialNumbers] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [error, setError] = useState("");
  const printRef = useRef();

  const handleSearchTransaction = () => {
    const serialArray = serialNumbers.split(",").map((s) => s.trim());
    const foundTransactions = transactions.filter((t) =>
      serialArray.includes(String(t.S_No))
    );

    if (foundTransactions.length > 0) {
      setSelectedTransactions(foundTransactions);
      setError("");
    } else {
      setError("No transactions found for the entered Serial Numbers!");
      setSelectedTransactions([]);
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
      <Modal isOpen={true} toggle={onClose} size="lg" centered>
        <div className="p-4 w-100" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Header Icons */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Main Close Button (Top-Left) */}
            {!selectedTransactions.length && (
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                onClick={onClose}
                style={{ cursor: "pointer", color: "#6c757d" }} // Grey color
              />
            )}

            <h3 className="modal-title mb-0">Create Quotation</h3>

            {/* Print & PDF Buttons (Top-Right) */}
            {selectedTransactions.length > 0 ? (
              <div className="d-flex gap-3">
                <FontAwesomeIcon
                  icon={faPrint}
                  size="2x"
                  onClick={handlePrint}
                  style={{ cursor: "pointer", color: "#6c757d" }} // Grey color
                />
                <FontAwesomeIcon
                  icon={faFilePdf}
                  size="2x"
                  onClick={handleDownloadPDF}
                  style={{ cursor: "pointer", color: "#6c757d" }} // Grey color
                />
                {/* Close Button (Only appears when quotation is shown - Top Right) */}
                <FontAwesomeIcon
                  icon={faTimes}
                  size="2x"
                  onClick={onClose}
                  style={{ cursor: "pointer", color: "#6c757d" }}
                />
              </div>
            ) : (
              <div></div> // Placeholder to maintain alignment
            )}
          </div>

          {/* Serial Number Input */}
          <FormGroup>
            <Label for="serialNumbers">Enter Serial Numbers (comma separated)</Label>
            <Input
              type="text"
              id="serialNumbers"
              value={serialNumbers}
              onChange={(e) => {
                setSerialNumbers(e.target.value);
                setError("");
              }}
              placeholder="Enter S.No, S.No, S.No"
            />
          </FormGroup>
          <Button color="primary" onClick={handleSearchTransaction} className="mb-3 w-100">
            Search
          </Button>

          {/* Display error message */}
          {error && <p className="text-danger text-center">{error}</p>}

          {selectedTransactions.length > 0 && (
            <div ref={printRef}>
              {/* Header Section */}
              <Row className="border-bottom pb-3 mb-3">
                <Col sm={6}>
                  <h6 className="fw-bold">In charge Pharmacy</h6>
                </Col>
                <Col sm={6} className="text-md-end text-center">
                  <p>{selectedTransactions[0].Delivery_Date}</p>
                </Col>
              </Row>

              <h3 className="text-center mb-4 fw-bold">Quotation</h3>

              {/* Quotation Details */}
              <div className="border p-3 mb-3">
                <p><strong>Hospital Name:</strong> {selectedTransactions[0].HospitalName}</p>
                <p><strong>Address:</strong> {selectedTransactions[0].CompleteAddress}</p>
                <p><strong>Subject:</strong> Perform By</p>
                <p>
                  Keeping in view the role of {selectedTransactions[0].HospitalName} in
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
                    {selectedTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.S_No}</td>
                        <td>{transaction.product}</td>
                        <td>{transaction.product}</td>
                        <td>{transaction.DoctorName}</td>
                        <td>{transaction.SR_Name}</td>
                        <td>{transaction.Amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Footer Section */}
              <div className="mt-4 border-top pt-3">
                <p>It would be a matter of great honor for us to serve your institution.</p>
                <p>Looking forward.</p>
                <br />
                <br />

                <p>Thanks and Regards,</p>
                <br />
                <br />
                <br />
                <br />
                <p><strong>Rajab Ali</strong></p>
                <p>Oncostele Pharma</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CreateQuotation;
