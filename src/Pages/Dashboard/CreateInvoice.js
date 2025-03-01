import React, { useState, useRef } from "react";
import { Col, Row, Modal, Input, FormGroup, Label } from "reactstrap";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";

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

const CreateInvoice = ({ transactions, onClose }) => {
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
    html2pdf().from(printRef.current).save("invoice.pdf");
  };

  return (
    <React.Fragment>
      <Modal isOpen={true} toggle={onClose} size="lg" centered>
        <div
          className="p-4 w-100"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
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
            <Label for="serialNumbers">
              Enter Serial Numbers (comma separated)
            </Label>
            <Input
              type="text"
              id="serialNumbers"
              value={serialNumbers}
              onChange={(e) => setSerialNumbers(e.target.value)}
              placeholder="Enter S.No, S.No, S.No"
            />
          </FormGroup>
          <Button
            color="primary"
            onClick={handleSearchTransaction}
            className="mb-3 w-100"
          >
            Search
          </Button>
          {error && <p className="text-danger text-center">{error}</p>}

          {selectedTransactions.length > 0 && (
            <div ref={printRef}>
              {/* Header Section */}
              <div className="text-center mb-4 border p-3">
                <h1 className="border-bottom pb-2 bg-dark text-white fw-bold m-0">
                  ONCOSTELE PHARMA
                </h1>
                <p className="m-0">
                  Plot No 22-Z, KMCH Society, Opp Suleman Molai Park, Near Hill
                  Park, Karachi
                </p>
                <p className="m-0">
                  Contact Number: 0331-0333645 / 0333-3566152
                </p>
                <p>Email Address: oncostelepharma@gmail.com</p>
              </div>

              <p className="text-center fw-bold border p-2">Cash Memo</p>

              {/* Customer Profile Section */}
              {selectedTransactions.map((transaction, index) => (
                <div key={index} className="p-3 mb-3 border">
                  <Row>
                    <Col md={6}>
                      <h5 className="text-center">Customer Profile</h5>
                      <p>
                        <strong>Care Of:</strong> {transaction.Care_Of}
                      </p>
                      <p>
                        <strong>Address:</strong> {transaction.CompleteAddress}
                      </p>
                      <p>
                        <strong>Contact No:</strong> {transaction.Contact}
                      </p>
                    </Col>
                    <Col md={6} className="text-md-end text-center">
                      <p>
                        <strong>Date:</strong> {transaction.Delivery_Date}
                      </p>
                      <p>
                        <strong>Invoice No:</strong>{" "}
                        {transaction.Invoice_Number}
                      </p>
                      <p>
                        <strong>Status:</strong> {transaction.Status}
                      </p>
                    </Col>
                  </Row>
                </div>
              ))}

              {/* Table Section (Responsive Table) */}
              <div className="table-responsive">
                <Table bordered className="text-center">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Product Description</th>
                      <th>Doctor Name</th>
                      <th>SR Name</th>
                      <th>Hospital Name</th>
                      <th>Delivery Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.S_No}</td>
                        <td>{transaction.product}</td>
                        <td>{transaction.DoctorName}</td>
                        <td>{transaction.SR_Name}</td>
                        <td>{transaction.HospitalName}</td>
                        <td>{transaction.Delivery_Date}</td>
                        <td>{transaction.Amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Totals Section */}
              <Row className="mt-3">
                <Col md={6}>
                  <p>
                    <strong>In Words:</strong>{" "}
                    {numberToWords(
                      selectedTransactions.reduce(
                        (total, transaction) =>
                          total + parseInt(transaction.Amount, 10),
                        0
                      )
                    )}
                  </p>
                </Col>
                <Col md={6} className="text-md-end text-center">
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    {selectedTransactions.reduce(
                      (total, transaction) =>
                        total + parseInt(transaction.Amount, 10),
                      0
                    )}
                  </p>
                  <p>
                    <strong>Sales Tax:</strong> -
                  </p>
                  <p>
                    <strong>Grand Total:</strong>{" "}
                    {selectedTransactions.reduce(
                      (total, transaction) =>
                        total + parseInt(transaction.Amount, 10),
                      0
                    )}
                  </p>
                </Col>
              </Row>

              {/* Footer Section */}
              <div className="text-center border-top pt-2 mt-4">
                <p>
                  <strong>*WE PRIORITIZE YOUR WELLNESS*</strong>
                </p>
                <p>
                  فروخت شدہ ادویات واپس یا تبدیل نہیں کی جائیں گی اس دوا کی
                  فروخت مستند ڈاکٹر کے نسخے کے مطابق کی گئی ہے
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Responsive Buttons) */}
      </Modal>
    </React.Fragment>
  );
};

export default CreateInvoice;
