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

const CreateInvoice = ({ transactions }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const printRef = useRef();

  useEffect(() => {
    if (!modal) {
      setSelectedTransaction(null);
      setError("");
      setSerialNumber("");
    }
  }, [modal]);

  const toggleModal = () => setModal(!modal);

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
    html2pdf().from(printRef.current).save("invoice.pdf");
  };

  return (
    <React.Fragment>
      <Button color="primary" size="sm" onClick={toggleModal}>
        <i className="mdi mdi-plus-circle me-2"></i> Create Invoice
      </Button>

      <Modal isOpen={modal} toggle={toggleModal} size="lg" centered>
        <Button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={toggleModal}
          aria-label="Close"
        ></Button>
        <div
          className="p-4 w-100"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {/* Serial Number Input */}
          <FormGroup>
            <Label for="serialNumber">Enter Serial Number</Label>
            <Input
              type="text"
              id="serialNumber"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter S.No"
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

          {selectedTransaction && (
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
              <div className="p-3 mb-3 border">
                <Row>
                  <Col md={6}>
                    <h5 className="text-center">Customer Profile</h5>
                    <p>
                      <strong>Care Of:</strong> {selectedTransaction.Care_Of}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {selectedTransaction.CompleteAddress}
                    </p>
                    <p>
                      <strong>Contact No:</strong> {selectedTransaction.Contact}
                    </p>
                  </Col>
                  <Col md={6} className="text-md-end text-center">
                    <p>
                      <strong>Date:</strong> {selectedTransaction.Delivery_Date}
                    </p>
                    <p>
                      <strong>Invoice No:</strong>{" "}
                      {selectedTransaction.Invoice_Number}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedTransaction.Status}
                    </p>
                  </Col>
                </Row>
              </div>

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
                    <tr>
                      <td>{selectedTransaction.S_No}</td>
                      <td>{selectedTransaction.product}</td>
                      <td>{selectedTransaction.DoctorName}</td>
                      <td>{selectedTransaction.SR_Name}</td>
                      <td>{selectedTransaction.HospitalName}</td>
                      <td>{selectedTransaction.Delivery_Date}</td>
                      <td>{selectedTransaction.Amount}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* Totals Section */}
              <Row className="mt-3">
                <Col md={6}>
                  <p>
                    <strong>In Words:</strong>{" "}
                    {numberToWords(parseInt(selectedTransaction.Amount, 10))}
                  </p>
                </Col>
                <Col md={6} className="text-md-end text-center">
                  <p>
                    <strong>Total Amount:</strong> {selectedTransaction.Amount}
                  </p>
                  <p>
                    <strong>Sales Tax:</strong> -
                  </p>
                  <p>
                    <strong>Grand Total:</strong> {selectedTransaction.Amount}
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
        <div className="modal-footer d-flex flex-wrap justify-content-center">
          <Button
            color="secondary"
            onClick={toggleModal}
            className="m-1 w-100 w-md-auto"
          >
            Close
          </Button>
          {selectedTransaction && (
            <>
              <Button
                color="primary"
                onClick={handlePrint}
                className="m-1 w-100 w-md-auto"
              >
                Print Invoice
              </Button>
              <Button
                color="danger"
                onClick={handleDownloadPDF}
                className="m-1 w-100 w-md-auto"
              >
                Download PDF
              </Button>
            </>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CreateInvoice;
