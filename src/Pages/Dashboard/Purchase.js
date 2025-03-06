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
    S_No: "",
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
    Expiry_Date: "",
    Batch_No: "",
    Quantity: "",
    Unit_Price: "",
    Total_Value: "",
    SalesTax: "",
    Advance_Tax: "",
    Further_Tax: "",
    Total_Gross_Amount: "",
    Name_Of_Bank: "",
    Cheque_Number: "",
    Payment_Through: "",
    Payment_Number: "",
    Total_Value_Incl_Tax: "",
    Balance: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddRecord = () => {
    let updatedPurchases = [...purchases];
    const totalValue =
      Number(formData.Quantity) * Number(formData.Unit_Price) || 0;
    const salesTax = Number(formData.SalesTax) || 0;
    const advanceTax = Number(formData.Advance_Tax) || 0;
    const furtherTax = Number(formData.Further_Tax) || 0;

    const totalGrossAmount = totalValue + salesTax + advanceTax + furtherTax;

    const updatedFormData = {
      ...formData,
      Total_Value: totalValue.toFixed(0),
      Total_Gross_Amount: totalGrossAmount.toFixed(0),
      Balance: (
        totalGrossAmount - (Number(formData.Total_Value_Incl_Tax) || 0)
      ).toFixed(0),
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

    // Recalculate Total Gross Amount and Balance
    const totalValue =
      Number(updatedFormData.Quantity) * Number(updatedFormData.Unit_Price) ||
      0;
    const salesTax = Number(updatedFormData.SalesTax) || 0;
    const advanceTax = Number(updatedFormData.Advance_Tax) || 0;
    const furtherTax = Number(updatedFormData.Further_Tax) || 0;

    const totalGrossAmount = totalValue + salesTax + advanceTax + furtherTax;
    const totalValueInclTax = Number(updatedFormData.Total_Value_Incl_Tax) || 0;
    const balance = totalGrossAmount - totalValueInclTax;

    updatedFormData.Total_Value = totalValue.toFixed(0);
    updatedFormData.Total_Gross_Amount = totalGrossAmount.toFixed(0);
    updatedFormData.Balance = balance.toFixed(0);

    setFormData(updatedFormData);
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
      Expiry_Date: "",
      Batch_No: "",
      Quantity: "",
      Unit_Price: "",
      Total_Value: "",
      SalesTax: "",
      Advance_Tax: "",
      Further_Tax: "",
      Total_Gross_Amount: "",
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
                          <th>Batch Number</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total Value</th>
                          <th>Sales Tax</th>
                          <th>Advance Tax</th>
                          <th>Furhter Tax</th>
                          <th>Total Gross Amount</th>
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
                            <td colSpan="26" className="text-center">
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
                              <td>{item.Batch_No}</td>
                              <td>{item.Quantity}</td>
                              <td>{item.Unit_Price}</td>
                              <td>{item.Quantity * item.Unit_Price}</td>
                              <td>{item.SalesTax}</td>
                              <td>{item.Advance_Tax}</td>
                              <td>{item.Further_Tax}</td>
                              <td>
                                {(
                                  parseFloat(item.Total_Value || 0) +
                                  parseFloat(item.SalesTax || 0) +
                                  parseFloat(item.Advance_Tax || 0) +
                                  parseFloat(item.Further_Tax || 0)
                                ).toFixed(0)}
                              </td>

                              <td>{item.Name_Of_Bank}</td>
                              <td>{item.Cheque_Number}</td>
                              <td>{item.Payment_Through}</td>
                              <td>{item.Payment_Number}</td>
                              <td>{item.Total_Value_Incl_Tax}</td>
                              <td>{item.Balance}</td>
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
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="S_No"
                    value={formData.S_No}
                    onChange={(e) =>
                      setFormData({ ...formData, S_No: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
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
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Ntn Number</Form.Label>
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
                  <Form.Label>Strn Number</Form.Label>
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
                  <Form.Label>Osp Po Date</Form.Label>
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
                  <Form.Label>Osp Po Number</Form.Label>
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
              <Col md={4}>
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

              <Col md={4}>
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
              <Col md={4}>
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
            </Row>
            <Row className="mb-3">
              <Col md={6}>
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
              <Col md={6}>
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
              <Col md={3}>
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
              <Col md={3}>
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
              <Col md={3}>
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
              <Col md={3}>
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
                      Number(formData.Further_Tax || 0)
                    }
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Title>Payment Detail Against Invoice</Modal.Title>
            <Row className="mt-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Name Of Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name_Of_Company"
                    value={formData.Name_Of_Company}
                    onChange={(e) =>
                      setFormData({ ...formData, Further_Tax: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Ntn Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="NTN_NO"
                    value={formData.NTN_NO}
                    onChange={(e) =>
                      setFormData({ ...formData, NTN_NO: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Strn Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="STRN_NO"
                    value={formData.STRN_NO}
                    onChange={(e) =>
                      setFormData({ ...formData, STRN_NO: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
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
            </Row>
            <Row>
              <Col md={3}>
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
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Payment Through</Form.Label>
                  <Form.Control
                    type="text"
                    name="Payment_Through"
                    value={formData.Payment_Through}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Payment_Through: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
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
              <Col md={3}>
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
            </Row>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Balanace</Form.Label>
                  <Form.Control
                    type="text"
                    name="Balance"
                    value={formData.Balance}
                    readOnly
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
