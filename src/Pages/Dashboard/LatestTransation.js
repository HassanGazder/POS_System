import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import { Modal, Button, Form, Table } from "react-bootstrap";
// import OrderStatus from "./OrderStatus";
const LatestTransaction = ({ setStats, setTransactions }) => {
  // const [transactions, setTransactions] = useState([]);
  const [transactions, setLocalTransactions] = useState([]);
  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0]; // Formats to YYYY-MM-DD
  };
  const [formData, setFormData] = useState({
    clientId: "1",
    clientName: "hassan",
    amount: "10",
    quantity: "1",
    type: "abc",
    weight: "10gm",
    color: "white",
    issueDate: getCurrentDate(),
    deliveryDate: "01/05/2003",
    productId: "1",
    status: "",
    prevAmount: "10",
    billNo: "10",
    totalAmount: "", //
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      clientId: "",
      clientName: "",
      amount: "",
      quantity: "",
      type: "",
      weight: "",
      color: "",
      issueDate: getCurrentDate(),
      deliveryDate: "",
      productId: "",
      status: "",
      prevAmount: "",
      billNo: "",
      totalAmount: "",
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
    const pending = transactions.filter((t) => t.status === "pending").length;
    const completed = transactions.filter(
      (t) => t.status === "completed"
    ).length;
    const cancelled = transactions.filter(
      (t) => t.status === "cancelled"
    ).length;

    return {
      pending,
      completed,
      cancelled,
      totalOrders,
      pendingPercent: totalOrders ? (pending / totalOrders) * 100 : 0,
      completedPercent: totalOrders ? (completed / totalOrders) * 100 : 0,
      cancelledPercent: totalOrders ? (cancelled / totalOrders) * 100 : 0,
    };
  }, [transactions]); // 🔥 Dependency added here

  useEffect(() => {
    setStats(calculateOrderStats()); // ✅ No more warning, because useCallback ensures stability
  }, [transactions, setStats, calculateOrderStats]); // Update stats whenever transactions change

  const [isFormValid, setIsFormValid] = useState(false);

  // Function to check if all fields are filled
  useEffect(() => {
    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === "prevAmount") return true; // ✅ Allow prevAmount to be empty
      return value.trim() !== "";
    });

    setIsFormValid(isValid);
  }, [formData]);

  // ✅ Automatically calculate Total Amount (prevAmount + amount)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalAmount: (
        (prev.prevAmount ? parseFloat(prev.prevAmount) : 0) + // If prevAmount is empty, use 0
        (prev.amount ? parseFloat(prev.amount) : 0)
      ).toFixed(2),
    }));
  }, [formData.prevAmount, formData.amount]);

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
                      <th>ID & Name</th>
                      <th>Prev Amount</th>
                      <th>Product Amount</th>
                      <th>Total Amount</th>
                      <th>Quantity</th>
                      <th>Type</th>
                      <th>Weight</th>
                      <th>Color</th>
                      <th>Issue Date</th>
                      <th>Delivery Date</th>
                      <th>Product ID</th>
                      <th>Bill No</th>
                      <th>Status</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan="14" className="text-center">
                          No records available
                        </td>
                      </tr>
                    ) : (
                      transactions.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="fw-bold">{item.clientName}</span>
                              <small className="text-muted">
                                ID: {item.clientId}
                              </small>
                            </div>
                          </td>
                          <td>${item.prevAmount}</td>
                          <td>${item.amount}</td>
                          <td>${item.totalAmount}</td>
                          <td>{item.quantity}</td>
                          <td>{item.type}</td>
                          <td>{item.weight}</td>
                          <td>{item.color}</td>
                          <td>{item.issueDate}</td>
                          <td>{item.deliveryDate}</td>
                          <td>{item.productId}</td>
                          <td>{item.billNo}</td>
                          <td>{item.status}</td>
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
                  <Form.Label>Client ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Previous Amount & Bill No */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Previous Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="prevAmount"
                    value={formData.prevAmount}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Bill No</Form.Label>
                  <Form.Control
                    type="text"
                    name="billNo"
                    value={formData.billNo}
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
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Product Amount, Total Amount & Quantity */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Product Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Type, Weight & Color */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Product ID & Status */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Product ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="productId"
                    value={formData.productId}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Delivered</option>
                    {isEditMode && <option value="cancelled">Cancelled</option>}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddRecord}
            disabled={!isFormValid}
          >
            {isEditMode ? "Update Record" : "Add Record"}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default LatestTransaction;
