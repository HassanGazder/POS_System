import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import { Modal, Button, Form, Table } from "react-bootstrap";
// import OrderStatus from "./OrderStatus";
const LatestTransaction = ({ setStats, setTransactions }) => {
  const [transactions, setLocalTransactions] = useState([]);
  const [formData, setFormData] = useState({
    S_No: "1",
    Care_Of: "hassan",
    product: "10",
    CompleteAddress: "1",
    DoctorName: "abc",
    Contact: "10gm",
    SR_Name: "white",
    HospitalName: "",
    Delivery_Date: new Date().toISOString().split("T")[0],
    Invoice_Number: "",
    QtxSale: "10",
    Amount: "10",
    Dosage_Month: "",
    Perform_By: "",
    Payment_Reciving_Date: new Date().toISOString().split("T")[0],
    Foc: "",
    Status: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input changes
  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleAddRecord = () => {
    let updatedTransactions = [...transactions];

    if (isEditMode) {
      // ✅ Update the existing record instead of adding a new one
      updatedTransactions[editIndex] = formData;
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      // ✅ Add a new record if it's not in edit mode
      updatedTransactions.push(formData);
    }

    setLocalTransactions(updatedTransactions);
    setTransactions(updatedTransactions);

    // Reset form and close modal
    setFormData({
      S_No: "1",
      Care_Of: "hassan",
      product: "10",
      CompleteAddress: "1",
      DoctorName: "abc",
      Contact: "10gm",
      SR_Name: "white",
      HospitalName: "",
      Delivery_Date: "1",
      Invoice_Number: "",
      QtxSale: "10",
      Amount: "10",
      Dosage_Month: "",
      Perform_By: "",
      Payment_Reciving_Date: "",
      Foc: "",
      Status: "",
    });

    setShowModal(false);
  };

  // Handle editing a record
  const handleEditRecord = (index) => {
    setFormData({ ...transactions[index] }); // ✅ Create a copy instead of referencing
    setEditIndex(index);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Handle deleting a record
  const handleDeleteRecord = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);

    setLocalTransactions(updatedTransactions); // ✅ Update local transactions
    setTransactions(updatedTransactions); // ✅ Update global transactions in Dashboard
  };

  const calculateOrderStats = useCallback(() => {
    const totalOrders = transactions.length;
    const pending = transactions.filter((t) => t.Status === "pending").length;
    const completed = transactions.filter(
      (t) => t.Status === "completed"
    ).length;
    const cancelled = transactions.filter(
      (t) => t.Status === "cancelled"
    ).length;

    return {
      pending,
      completed,
      cancelled,
      pendingPercent: totalOrders ? (pending / totalOrders) * 100 : 0,
      completedPercent: totalOrders ? (completed / totalOrders) * 100 : 0,
      cancelledPercent: totalOrders ? (cancelled / totalOrders) * 100 : 0,
    };
  }, [transactions]); // 🔥 Dependency added here

  useEffect(() => {
    setStats(calculateOrderStats()); // ✅ No more warning, because useCallback ensures stability
  }, [transactions, setStats, calculateOrderStats]); // Update stats whenever transactions change

  // const [isFormValid, setIsFormValid] = useState(false);

  // Function to check if all fields are filled
  // useEffect(() => {
  //   const isValid = Object.entries(formData).every(([key, value]) => {
  //     if (key === "prevAmount") return true; // ✅ Allow prevAmount to be empty
  //     return value.trim() !== "";
  //   });

  //   setIsFormValid(isValid);
  // }, [formData]);

  // ✅ Automatically calculate Total Amount (prevAmount + amount)
  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     totalAmount: (
  //       (prev.prevAmount ? parseFloat(prev.prevAmount) : 0) + // If prevAmount is empty, use 0
  //       (prev.amount ? parseFloat(prev.amount) : 0)
  //     ).toFixed(2),
  //   }));
  // }, [formData.prevAmount, formData.amount]);

  const medicineList = [
    "Panadol",
    "Brufen",
    "Disprin",
    "Augmentin",
    "Ciprofloxacin",
    "Flagyl",
    "Ponstan",
    "Paracetamol",
    "Dolofen",
    "Mobic",
    "Neurobion",
  ];
 
  const [suggestions, setSuggestions] = useState([]);

    // ✅ Handle input changes, including autocomplete for "product"
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      if (name === "product") {
        if (value.length > 0) {
          const filtered = medicineList.filter((medicine) =>
            medicine.toLowerCase().includes(value.toLowerCase())
          );
          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
      }
    };

  const handleSelectSuggestion = (medicine) => {
    setFormData((prev) => ({ ...prev, product: medicine }));
    setSuggestions([]); // Hide suggestions after selection
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="card-title mb-0">Latest Transaction</h4>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowModal(true)}
                >
                  <i className="mdi mdi-plus-circle me-2"></i> Add Record
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
                  <thead
                    className="table-header"
                    style={{
                      position: "sticky",
                      top: "0",
                      background: "white",
                      zIndex: "1",
                    }}
                  >
                    <tr>
                      <th>S.No</th>
                      <th>Care Of</th>
                      <th>Product</th>
                      <th>Complete Address</th>
                      <th>Doctor Name</th>
                      <th>Contact</th>
                      <th>SR Number</th>
                      <th>Hospital Name</th>
                      <th>Delivery Date</th>
                      <th>Invoice Number</th>
                      <th>QTX Sale</th>
                      <th>Amount</th>
                      <th>Dosage Amount</th>
                      <th>Perform By</th>
                      <th>Payment Reciving Date</th>
                      <th>FOC</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan="18" className="text-center">
                          No records available
                        </td>
                      </tr>
                    ) : (
                      transactions.map((item, index) => (
                        <tr key={index}>
                          <td>{item.S_No}</td>
                          <td>{item.Care_Of}</td>
                          <td>{item.product}</td>
                          <td>{item.CompleteAddress}</td>
                          <td>{item.DoctorName}</td>
                          <td>{item.Contact}</td>
                          <td>{item.SR_Name}</td>
                          <td>{item.HospitalName}</td>
                          <td>{item.Delivery_Date}</td>
                          <td>{item.Invoice_Number}</td>
                          <td>{item.QtxSale}</td>
                          <td>{item.Amount}</td>
                          <td>{item.Dosage_Month}</td>
                          <td>{item.Perform_By}</td>
                          <td>{item.Payment_Reciving_Date}</td>
                          <td>{item.Foc}</td>
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
                          <td>{item.Status}</td>
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

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Record" : "Add New Record"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Client ID & Name */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>S_No</Form.Label>
                  <Form.Control
                    type="text"
                    name="S_No"
                    value={formData.S_No}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Care_Of</Form.Label>
                  <Form.Control
                    type="text"
                    name="Care_Of"
                    value={formData.Care_Of}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6} style={{ position: "relative" }}>
                <Form.Group>
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    required
                  />
                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        width: "100%",
                        zIndex: 1000,
                        maxHeight: "150px",
                        overflowY: "auto",
                        borderRadius: "5px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      {suggestions.map((medicine, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectSuggestion(medicine)}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                            transition: "background 0.2s",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.background = "#f1f1f1")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.background = "#fff")
                          }
                        >
                          {medicine}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Complete Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="CompleteAddress"
                    value={formData.CompleteAddress}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Issue Date & Delivery Date */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Doctor Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="DoctorName"
                    value={formData.DoctorName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="Contact"
                    value={formData.Contact}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>SR_Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="SR_Name"
                    value={formData.SR_Name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="HospitalName"
                    value={formData.HospitalName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Delivery_Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="Delivery_Date"
                    value={formData.Delivery_Date}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Invoice_Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Invoice_Number"
                    value={formData.Invoice_Number}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Qtx Sale</Form.Label>
                  <Form.Control
                    type="text"
                    name="QtxSale"
                    value={formData.QtxSale}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    name="Amount"
                    value={formData.Amount}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Dosage_Month</Form.Label>
                  <Form.Control
                    type="text"
                    name="Dosage_Month"
                    value={formData.Dosage_Month}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Perform_By</Form.Label>
                  <Form.Control
                    type="text"
                    name="Perform_By"
                    value={formData.Perform_By}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Payment_Reciving_Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="Payment_Reciving_Date"
                    value={formData.Payment_Reciving_Date}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Foc</Form.Label>
                  <Form.Control
                    type="text"
                    name="Foc"
                    value={formData.Foc}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="Status"
                value={formData.Status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Delivered</option>
                {isEditMode && <option value="cancelled">Cancelled</option>}
              </Form.Select>
            </Form.Group>
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

export default LatestTransaction;
