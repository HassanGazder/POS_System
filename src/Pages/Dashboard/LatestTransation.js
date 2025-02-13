import React, { useState, useEffect,useCallback } from "react";
import { Row, Col } from "reactstrap";
import { Modal, Button, Form, Table } from "react-bootstrap";
// import OrderStatus from "./OrderStatus";
const LatestTransaction = ({ setStats, setTransactions }) => {
  // const [transactions, setTransactions] = useState([]);
  const [transactions, setLocalTransactions] = useState([]);
  const [formData, setFormData] = useState({
    clientId: "1",
    clientName: "abc",
    date: "03/05/2004",
    price: "1",
    quantity: "1",
    type: "abc",
    weight: "1",
    color: "abc",
    issueDate: "03/05/2005",
    deliveryDate: "03/05/2003",
    productId: "1",
    paymentType: "cash",
    status: "pending",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle radio button change
  const handlePaymentTypeChange = (e) => {
    setFormData({ ...formData, paymentType: e.target.value });
  };

  // Handle adding/updating a record
  const handleAddRecord = () => {
    const updatedTransactions = [...transactions, formData];
    setLocalTransactions(updatedTransactions);
    setTransactions(updatedTransactions);
    if (isEditMode) {
      const updatedTransactions = [...transactions];
      updatedTransactions[editIndex] = formData;
      setTransactions(updatedTransactions);
      setIsEditMode(false);
    } else {
      setTransactions([...transactions, formData]);
    }

    // Reset form and close modal
    setFormData({
      clientId: "",
      clientName: "",
      date: "",
      price: "",
      quantity: "",
      type: "",
      weight: "",
      color: "",
      issueDate: "",
      deliveryDate: "",
      productId: "",
      paymentType: "cash",
      status: "pending",
    });
    setShowModal(false);
  };

  // Handle editing a record
  const handleEditRecord = (index) => {
    setFormData(transactions[index]);
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
    const completed = transactions.filter((t) => t.status === "completed").length;
    const cancelled = transactions.filter((t) => t.status === "cancelled").length;

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
                      <th style={{ minWidth: "150px" }}>ID & Name</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Type</th>
                      <th>Weight</th>
                      <th>Color</th>
                      <th>Issue Date</th>
                      <th>Delivery Date</th>
                      <th>Product ID</th>
                      <th>Payment Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th style={{ minWidth: "150px", textAlign: "center" }}>
                        Action
                      </th>
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
                          <td>{item.date}</td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.type}</td>
                          <td>{item.weight}</td>
                          <td>{item.color}</td>
                          <td>{item.issueDate}</td>
                          <td>{item.deliveryDate}</td>
                          <td>{item.productId}</td>
                          <td>{item.paymentType}</td>
                          <td>$ {item.quantity * item.price}</td>
                          <td>
                            {item.status === "pending" ? (
                              <i className="mdi mdi-checkbox-blank-circle me-1 text-warning"></i>
                            ) : item.status === "completed" ? (
                              <i className="mdi mdi-checkbox-blank-circle me-1 text-success"></i>
                            ) : item.status === "cancelled" ? (
                              <i className="mdi mdi-checkbox-blank-circle me-1 text-danger"></i>
                            ) : null}
                            {item.status}
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

        {/* Order Stats Component */}
        {/* <OrderStatus stats={calculateOrderStats()} /> */}
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

            {/* Date Fields (With Calendar Popup) */}
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

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

            {/* Price & Quantity */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
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

            {/* Type, Weight, Color */}
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

            {/* Product ID & Payment Type */}
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
                  <Form.Label>Payment Type</Form.Label>
                  <br />
                  <Form.Check
                    inline
                    label="Cash"
                    type="radio"
                    name="paymentType"
                    value="cash"
                    checked={formData.paymentType === "cash"}
                    onChange={handlePaymentTypeChange}
                  />
                  <Form.Check
                    inline
                    label="To Be Paid"
                    type="radio"
                    name="paymentType"
                    value="To Be Paid"
                    checked={formData.paymentType === "To Be Paid"}
                    onChange={handlePaymentTypeChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Status Field (Only "Cancelled" Appears in Edit Mode) */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
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
