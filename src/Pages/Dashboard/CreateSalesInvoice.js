import React, { useState, useRef ,useContext} from "react";
import { Col, Row, Modal, Input, FormGroup, Label } from "reactstrap";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";

// context api 
import { DashboardContext } from "../../Pages/Dashboard/DashboardContext";

const numberToWords = (num) => {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convert = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " and " + convert(n % 100) : "")
      );
    if (n < 1000000)
      return (
        convert(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + convert(n % 1000) : "")
      );
    return "Number too large";
  };

  return num ? convert(num) + " Only" : "";
};

const CreateSalesInvoice = ({ onClose }) => {
   const { transactions } = useContext(DashboardContext);
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
    html2pdf().from(printRef.current).save("sales_invoice.pdf");
  };

  return (
    <React.Fragment>
      <Modal isOpen={true} toggle={onClose} size="lg" centered>
        <div className="p-4 w-100" style={{ maxWidth: "800px", margin: "0 auto" }}>
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
                  <h5 className="fw-bold">Umar Pharma (Pvt) Limited</h5>
                  <p>{selectedTransactions[0].CompleteAddress}</p>
                </Col>
                <Col sm={6} className="text-md-end text-center">
                  <h2>SALES INVOICE</h2>
                  <p>ACC No: {selectedTransactions[0].Invoice_Number}</p>
                </Col>
              </Row>

              {/* Customer and Invoice Details */}
              <div className="border p-3 mb-3">
                <Row>
                  <Col sm={6}>
                    <p><strong>Customer Name:</strong> {selectedTransactions[0].Care_Of}</p>
                    <p><strong>Tax ID:</strong> {selectedTransactions[0].S_No}</p>
                    <p><strong>Address:</strong> {selectedTransactions[0].CompleteAddress}</p>
                  </Col>
                  <Col sm={6} className="text-md-end text-center">
                    <p><strong>Sales Person:</strong> {selectedTransactions[0].SR_Name}</p>
                    <p><strong>Date:</strong> {selectedTransactions[0].Delivery_Date}</p>
                    <p><strong>Payment Due Date:</strong> {selectedTransactions[0].Delivery_Date}</p>
                    <p><strong>Customer PO:</strong> {selectedTransactions[0].Care_Of}</p>
                    <p><strong>Customer PO Date:</strong> {selectedTransactions[0].Delivery_Date}</p>
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
                    {selectedTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.S_No}</td>
                        <td>{transaction.product}</td>
                        <td>{transaction.QtxSale}</td>
                        <td>{transaction.Amount / transaction.QtxSale}</td> {/* Assuming Amount is total for the quantity */}
                        <td>{transaction.Delivery_Date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Totals Section */}
              <Row className="mt-3">
                <Col sm={6}>
                  <p><strong>Total Quantity:</strong> {selectedTransactions.reduce((total, transaction) => total + parseInt(transaction.QtxSale, 10), 0)}</p>
                  <p><strong>Tax on Sales:</strong> -</p>
                  <p><strong>Additional Discount:</strong> -</p>
                </Col>
                <Col sm={6} className="text-md-end text-center">
                  <p><strong>Total:</strong> {selectedTransactions.reduce((total, transaction) => total + parseInt(transaction.Amount, 10), 0)}</p>
                  <p><strong>Grand Total:</strong> {selectedTransactions.reduce((total, transaction) => total + parseInt(transaction.Amount, 10), 0)}</p>
                  <p><strong>Rounded Total:</strong> {selectedTransactions.reduce((total, transaction) => total + parseInt(transaction.Amount, 10), 0)}</p>
                  <p><strong>Amount in Words:</strong> {numberToWords(selectedTransactions.reduce((total, transaction) => total + parseInt(transaction.Amount, 10), 0))}</p>
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
     
      </Modal>
    </React.Fragment>
  );
};

export default CreateSalesInvoice;