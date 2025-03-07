import React, { useContext, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col } from "reactstrap";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { DashboardContext } from "../../Pages/Dashboard/DashboardContext";
import CreatePurchaseInvoice from "./CreatePurchaseInvoice";

const Purchase = () => {
  const { setPurchases } = useContext(DashboardContext);
  const [purchases, setLocalPurchases] = useState([]);
  const [formData, setFormData] = useState({
    S_No: 0,
    Name_Of_Company: "",
    NTN_NO: "",
    STRN_NO: "",
    Company_Address: "",
    OSP_PO_DATE: "",
    OSP_PO_NUMBER: "",
    INVOICE_DATE: new Date().toISOString().split("T")[0],
    InvoiceNo: "",
    Product_Description: "",
    Pack_Size: "",
    Loose: "",
    Bonus: "",
    Batch_No: "",
    Product_Serial_No: "",
    Expiry_Date: "",
    Quantity: "0",
    Unit_Price: "0",
    Total_Value: "0",
    SalesTax: "0",
    Advance_Tax: "0",
    Further_Tax: "0",
    Discount: "0",
    Total_Gross_Amount: "0",
    Your_Company_Name: "",
    Your_Company_NTN_NO: "",
    Your_Company_STRN_NO: "",
    Name_Of_Bank: "",
    Cheque_Number: "",
    Payment_Through: "",
    Payment_Number: "",
    Total_Value_Incl_Tax: "0",
    Balance: "", // Keep empty instead of "0"
  });
  
  

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddRecord = () => {
    formData.S_No = purchases.length
      ? Math.max(...purchases.map((t) => t.S_No)) + 1
      : 1;
    let updatedPurchases = [...purchases];
    const totalValue =
      Number(formData.Quantity) * Number(formData.Unit_Price) || 0;
    const salesTax = Number(formData.SalesTax) || 0;
    const advanceTax = Number(formData.Advance_Tax) || 0;
    const furtherTax = Number(formData.Further_Tax) || 0;
    const discount = Number(formData.Discount) || 0;

    // Calculate Total Gross Amount with discount
    const totalGrossAmount =
      totalValue + salesTax + advanceTax + furtherTax - discount;

    const updatedFormData = {
      ...formData,
      Total_Value: totalValue.toFixed(0),
      Total_Gross_Amount: totalGrossAmount.toFixed(0),
      Balance: (
        totalGrossAmount - (Number(formData.Total_Value_Incl_Tax) || 0)
      ).toFixed(2),
    };

    if (isEditMode) {
      updatedPurchases[editIndex] = updatedFormData;
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      updatedPurchases.push(updatedFormData);
    }

    setPurchases(updatedPurchases);
    setLocalPurchases(updatedPurchases);
    resetForm();
    setShowModal(false);
  };

  const handleFieldChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
  
    // Ensure values are numbers
    const totalValue =
      Number(updatedFormData.Quantity) * Number(updatedFormData.Unit_Price) || 0;
    const salesTax = Number(updatedFormData.SalesTax) || 0;
    const advanceTax = Number(updatedFormData.Advance_Tax) || 0;
    const furtherTax = Number(updatedFormData.Further_Tax) || 0;
    const discount = Number(updatedFormData.Discount) || 0;
    const totalValueInclTax = Number(updatedFormData.Total_Value_Incl_Tax) || 0;
  
    // Calculate Total Gross Amount with discount
    const totalGrossAmount = totalValue + salesTax + advanceTax + furtherTax - discount;
    const balance = totalGrossAmount - totalValueInclTax;
  
    // Update form data with valid numbers
    setFormData({
      ...updatedFormData,
      Total_Value: totalValue.toFixed(0),
      Total_Gross_Amount: totalGrossAmount.toFixed(0),
      Balance: balance.toFixed(2), // Ensures no NaN
    });
  };
  

  const getBalanceDisplay = (balance) => {
    if (balance === "" || balance === null || balance === undefined) {
      return ""; // Keep empty instead of showing "Paid" by default
    }
  
    const balanceValue = parseFloat(balance) || 0;
  
    if (balanceValue === 0) {
      return "Paid"; // Show only if explicitly 0
    } else if (balanceValue < 0) {
      return `+${Math.abs(balanceValue).toFixed(0)}`; // Overpayment
    }
    return `-${balanceValue.toFixed(0)}`; // Amount due
  };
  
  

  const getBalanceClass = (balance) => {
    const balanceValue = parseFloat(balance) || 0; // Ensure it's a number
  
    if (balanceValue === 0) {
      return "text-success"; // Paid
    } else if (balanceValue < 0) {
      return "text-danger"; // Overpaid
    }
    return "text-danger"; // Due amount (blue)
  };
  

  const handleEditRecord = (index) => {
    setFormData({ ...purchases[index] });
    setEditIndex(index);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteRecord = (index) => {
    const updatedPurchases = purchases.filter((_, i) => i !== index);
    setPurchases(updatedPurchases);
    setLocalPurchases(updatedPurchases);
  };

  const resetForm = () => {
    setFormData({
      S_No: "",
      Name_Of_Company: "",
      NTN_NO: "",
      STRN_NO: "",
      Company_Address: "",
      OSP_PO_DATE: "",
      OSP_PO_NUMBER: "",
      INVOICE_DATE: "",
      InvoiceNo: "",
      Product_Description: "",
      Pack_Size: "",
      Loose: "",
      Bonus: "",
      Product_Serial_No: "",
      Batch_No: "",
      Expiry_Date: "",
      Quantity: "",
      Unit_Price: "",
      Total_Value: "",
      SalesTax: "",
      Advance_Tax: "",
      Further_Tax: "",
      Discount: "",
      Total_Gross_Amount: "",
      Your_Company_Name: "",
      Your_Company_NTN_NO: "",
      Your_Company_STRN_NO: "",
      Name_Of_Bank: "",
      Cheque_Number: "",
      Payment_Through: "",
      Payment_Number: "",
      Total_Value_Incl_Tax: "",
      Balance: "",
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Upzet" breadcrumbItem="Purchase" />
          <CreatePurchaseInvoice />
          <Row>
            <Col lg={12}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="card-title mb-0">Purchase Records</h4>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="mdi mdi-plus-circle me-2"></i> Add Purchase
                    </Button>
                  </div>
                  <div
                    className="table-responsive"
                    style={{
                      maxHeight: "500px",
                      overflowY: "auto",
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Table
                      className="table-centered mb-0"
                      striped
                      bordered
                      hover
                      style={{ minWidth: "1200px" }}
                    >
                      <thead>
                        <tr>
                          <th>Serial Number</th>
                          <th>Name Of Company</th>
                          <th>Ntn Number</th>
                          <th>Strn Number</th>
                          <th>Company Address</th>
                          <th>Osp Po Date</th>
                          <th>Osp Po Number</th>
                          <th>Invoice Date</th>
                          <th>Invoice Number</th>
                          <th>Product Description</th>
                          <th>Pack Size</th>
                          <th>Loose</th>
                          <th>Bonus</th>
                          <th>Batch Number</th>
                          <th>Product Serial Number</th>
                          <th>Expiry Date</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total Value</th>
                          <th>Sales Tax</th>
                          <th>Advance Tax</th>
                          <th>Further Tax</th>
                          <th>Discount</th>
                          <th>Total Gross Amount</th>
                          <th>Your Company Name</th>
                          <th>Your Company NTN Number</th>
                          <th>Your Company STRN Number</th>
                          <th>Name Of Bank</th>
                          <th>Cheque Number</th>
                          <th>Payment Through</th>
                          <th>Payment Number</th>
                          <th>Total Value Incl Tax</th>
                          <th>Balance</th>
                          <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchases.length === 0 ? (
                          <tr>
                            <td colSpan="36" className="text-center">
                              No records available
                            </td>
                          </tr>
                        ) : (
                          purchases.map((item, index) => (
                            <tr key={index}>
                              <td>{item.S_No}</td>
                              <td>{item.Name_Of_Company}</td>
                              <td>{item.NTN_NO}</td>
                              <td>{item.STRN_NO}</td>
                              <td>{item.Company_Address}</td>
                              <td>{item.OSP_PO_DATE}</td>
                              <td>{item.OSP_PO_NUMBER}</td>
                              <td>{item.INVOICE_DATE}</td>
                              <td>{item.InvoiceNo}</td>
                              <td>{item.Product_Description}</td>
                              <td>{item.Pack_Size}</td>
                              <td>{item.Loose}</td>
                              <td>{item.Bonus}</td>
                              <td>{item.Batch_No}</td>
                              <td>{item.Product_Serial_No}</td>
                              <td>{item.Expiry_Date}</td>
                              <td>{item.Quantity}</td>
                              <td>{item.Unit_Price}</td>
                              <td>{item.Quantity * item.Unit_Price}</td>
                              <td>{item.SalesTax}</td>
                              <td>{item.Advance_Tax}</td>
                              <td>{item.Further_Tax}</td>
                              <td>{item.Discount}</td>
                              <td>
                                {(
                                  parseFloat(item.Total_Value || 0) +
                                  parseFloat(item.SalesTax || 0) +
                                  parseFloat(item.Advance_Tax || 0) +
                                  parseFloat(item.Further_Tax || 0) -
                                  parseFloat(item.Discount || 0)
                                ).toFixed(0)}
                              </td>
                              <td>{item.Your_Company_Name}</td>
                              <td>{item.Your_Company_NTN_NO}</td>
                              <td>{item.Your_Company_STRN_NO}</td>
                              <td>{item.Name_Of_Bank}</td>
                              <td>{item.Cheque_Number}</td>
                              <td>{item.Payment_Through}</td>
                              <td>{item.Payment_Number}</td>
                              <td>{item.Total_Value_Incl_Tax}</td>
                              <td className={getBalanceClass(item.Balance)}>
                                {getBalanceDisplay(item.Balance)}
                              </td>

                              <td style={{ textAlign: "center" }}>
                                <div className="d-flex justify-content-center gap-2">
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => handleEditRecord(index)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteRecord(index)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal */}
      <Modal
        dialogClassName="modal-lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Purchase Record" : "Add New Purchase Record"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name Of Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name_Of_Company"
                    value={formData.Name_Of_Company}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Name_Of_Company: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>NTN Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="NTN_NO"
                    value={formData.NTN_NO}
                    onChange={(e) =>
                      setFormData({ ...formData, NTN_NO: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>STRN Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="STRN_NO"
                    value={formData.STRN_NO}
                    onChange={(e) =>
                      setFormData({ ...formData, STRN_NO: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Company Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="Company_Address"
                    value={formData.Company_Address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Company_Address: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>OSP Po Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="OSP_PO_DATE"
                    value={formData.OSP_PO_DATE}
                    onChange={(e) =>
                      setFormData({ ...formData, OSP_PO_DATE: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>OSP Po Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="OSP_PO_NUMBER"
                    value={formData.OSP_PO_NUMBER}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        OSP_PO_NUMBER: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Invoice Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="INVOICE_DATE"
                    value={formData.INVOICE_DATE}
                    onChange={(e) =>
                      setFormData({ ...formData, INVOICE_DATE: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="InvoiceNo"
                    value={formData.InvoiceNo}
                    onChange={(e) =>
                      setFormData({ ...formData, InvoiceNo: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="Product_Description"
                    value={formData.Product_Description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Product_Description: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Pack Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="Pack_Size"
                    value={formData.Pack_Size}
                    onChange={(e) =>
                      setFormData({ ...formData, Pack_Size: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Loose</Form.Label>
                  <Form.Control
                    type="text"
                    name="Loose"
                    value={formData.Loose}
                    onChange={(e) =>
                      setFormData({ ...formData, Loose: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Bonus</Form.Label>
                  <Form.Control
                    type="text"
                    name="Bonus"
                    value={formData.Bonus}
                    onChange={(e) =>
                      setFormData({ ...formData, Bonus: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Batch Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Batch_No"
                    value={formData.Batch_No}
                    onChange={(e) =>
                      setFormData({ ...formData, Batch_No: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Product Serial Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Prodcuts_Serial_No"
                    value={formData.Product_Serial_No}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Product_Serial_No: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="Expiry_Date"
                    value={formData.Expiry_Date}
                    onChange={(e) =>
                      setFormData({ ...formData, Expiry_Date: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    name="Quantity"
                    value={formData.Quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, Quantity: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="Unit_Price"
                    value={formData.Unit_Price}
                    onChange={(e) =>
                      setFormData({ ...formData, Unit_Price: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Total Value</Form.Label>
                  <Form.Control
                    type="text"
                    name="Total_Value"
                    value={
                      Number(formData.Quantity) * Number(formData.Unit_Price) ||
                      0
                    }
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Sales Tax</Form.Label>
                  <Form.Control
                    type="text"
                    name="SalesTax"
                    value={formData.SalesTax}
                    onChange={(e) =>
                      handleFieldChange("SalesTax", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Advance Tax</Form.Label>
                  <Form.Control
                    type="text"
                    name="Advance_Tax"
                    value={formData.Advance_Tax}
                    onChange={(e) =>
                      handleFieldChange("Advance_Tax", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Further Tax</Form.Label>
                  <Form.Control
                    type="text"
                    name="Further_Tax"
                    value={formData.Further_Tax}
                    onChange={(e) =>
                      handleFieldChange("Further_Tax", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="text"
                    name="Discount"
                    value={formData.Discount}
                    onChange={(e) =>
                      handleFieldChange("Discount", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Total Gross Amount</Form.Label>
                  <Form.Control
                    type="text"
                    name="Total_Gross_Amount"
                    value={
                      (Number(formData.Quantity) *
                        Number(formData.Unit_Price) || 0) +
                      Number(formData.SalesTax || 0) +
                      Number(formData.Advance_Tax || 0) +
                      Number(formData.Further_Tax || 0) -
                      Number(formData.Discount || 0)
                    }
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Title>Payment Detail Against Invoice</Modal.Title>
            <Row className="mt-3 mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Your Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Your_Company_Name"
                    value={formData.Your_Company_Name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Your_Company_Name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Your Company NTN Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Your_Company_NTN_NO"
                    value={formData.Your_Company_NTN_NO}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Your_Company_NTN_NO: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Your Company STRN Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Your_Company_STRN_NO"
                    value={formData.Your_Company_STRN_NO}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Your_Company_STRN_NO: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Name Of Bank</Form.Label>
                  <Form.Select
                    name="Name_Of_Bank"
                    value={formData.Name_Of_Bank}
                    onChange={(e) =>
                      setFormData({ ...formData, Name_Of_Bank: e.target.value })
                    }
                  >
                    <option value="">Select Bank</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="HBL Bank">HBL Bank</option>
                    <option value="Easypaisa">Easypaisa</option>
                    <option value="JazzCash">JazzCash</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Cheque Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Cheque_Number"
                    value={formData.Cheque_Number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Cheque_Number: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Payment Through</Form.Label>
                  <Form.Select
                    name="Payment_Through"
                    value={formData.Payment_Through}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Payment_Through: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Bank Transfer">Pay Order</option>
                    <option value="Bank Transfer">Rtgs</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Payment Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Payment_Number"
                    value={formData.Payment_Number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Payment_Number: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Total Value Incl Tax</Form.Label>
                  <Form.Control
                    type="text"
                    name="Total_Value_Incl_Tax"
                    value={formData.Total_Value_Incl_Tax}
                    onChange={(e) =>
                      handleFieldChange("Total_Value_Incl_Tax", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Balance</Form.Label>
                  <Form.Control
                    type="text"
                    name="Balance"
                    value={getBalanceDisplay(formData.Balance)}
                    readOnly
                    className={getBalanceClass(formData.Balance)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecord}>
            {isEditMode ? "Update Record" : "Add Record"}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Purchase;