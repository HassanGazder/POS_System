import React, { useState, useRef, useContext } from "react";
import { Modal, Input, FormGroup, Label } from "reactstrap";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import { DashboardContext } from "../../Pages/Dashboard/DashboardContext";

const CreatePurchaseInvoice = ({ isOpen, onClose }) => {
  const { purchases } = useContext(DashboardContext);
  const [serialNumbers, setSerialNumbers] = useState("");
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  const [error, setError] = useState("");
  const printRef = useRef();

  const handleSearchTransaction = () => {
    const serialArray = serialNumbers.split(",").map((s) => s.trim());
    const foundPurchases = purchases.filter((p) =>
      serialArray.includes(String(p.S_No))
    );

    if (foundPurchases.length > 0) {
      setSelectedPurchases(foundPurchases);
      setError("");
    } else {
      setError("No transactions found for the entered Serial Numbers!");
      setSelectedPurchases([]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    html2pdf().from(printRef.current).save("purchase_invoice.pdf");
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg" centered>
      <div className="p-4 w-100" style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header with Title & Actions */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="modal-title mb-0">Create Purchase Invoice</h3>
          {selectedPurchases.length > 0 && (
            <div className="d-flex gap-3">
              <FontAwesomeIcon
                icon={faPrint}
                size="2x"
                onClick={handlePrint}
                style={{ cursor: "pointer", color: "#6c757d" }}
              />
              <FontAwesomeIcon
                icon={faFilePdf}
                size="2x"
                onClick={handleDownloadPDF}
                style={{ cursor: "pointer", color: "#6c757d" }}
              />
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                onClick={onClose}
                style={{ cursor: "pointer", color: "#6c757d" }}
              />
            </div>
          )}
        </div>

        {/* Serial Number Input */}
        <FormGroup>
          <Label>Enter Serial Numbers (comma separated)</Label>
          <Input
            type="text"
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
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Invoice Display */}
        {selectedPurchases.length > 0 && (
          <div ref={printRef} className="border p-4">
            <h4 className="text-center mb-4 fw-bold">Purchase Invoice</h4>

            {/* Invoice Header */}
            <div className="border p-3 mb-3">
              <p><strong>Company:</strong> {selectedPurchases[0].Name_Of_Company}</p>
              <p><strong>NTN:</strong> {selectedPurchases[0].NTN_NO} | <strong>STRN:</strong> {selectedPurchases[0].STRN_NO}</p>
              <p><strong>Address:</strong> {selectedPurchases[0].Company_Address}</p>
              <p><strong>Invoice Date:</strong> {selectedPurchases[0].INVOICE_DATE}</p>
              <p><strong>Invoice No:</strong> {selectedPurchases[0].InvoiceNo}</p>
            </div>

            {/* Purchase Items Table */}
            <Table bordered className="text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product</th>
                  <th>Pack Size</th>
                  <th>Batch No</th>
                  <th>Expiry Date</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedPurchases.map((purchase, index) => (
                  <tr key={index}>
                    <td>{purchase.S_No}</td>
                    <td>{purchase.Product_Description}</td>
                    <td>{purchase.Pack_Size}</td>
                    <td>{purchase.Batch_No}</td>
                    <td>{purchase.Expiry_Date}</td>
                    <td>{purchase.Quantity}</td>
                    <td>{purchase.Unit_Price}</td>
                    <td>{purchase.Total_Value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Invoice Totals */}
            <div className="border p-3 mt-3">
              <p><strong>Sales Tax:</strong> {selectedPurchases[0].SalesTax}</p>
              <p><strong>Advance Tax:</strong> {selectedPurchases[0].Advance_Tax}</p>
              <p><strong>Further Tax:</strong> {selectedPurchases[0].Further_Tax}</p>
              <p className="fw-bold"><strong>Total Gross Amount:</strong> {selectedPurchases[0].Total_Gross_Amount}</p>
              <p><strong>Bank Name:</strong> {selectedPurchases[0].Name_Of_Bank}</p>
              <p><strong>Cheque Number:</strong> {selectedPurchases[0].Cheque_Number}</p>
              <p><strong>Payment Mode:</strong> {selectedPurchases[0].Payment_Through}</p>
              <p><strong>Payment Number:</strong> {selectedPurchases[0].Payment_Number}</p>
              <p className="fw-bold"><strong>Total Amount Incl. Tax:</strong> {selectedPurchases[0].Total_Value_Incl_Tax}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreatePurchaseInvoice;
