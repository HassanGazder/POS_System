import React, { useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Row, Col } from "reactstrap";
import { Modal, Button, Form, Table } from "react-bootstrap";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [formData, setFormData] = useState({
    SNo: "",
    StockCode: "",
    PackSize: "",
    BatchNo: "",
    ExpiryDate: new Date().toISOString().split("T")[0],
    Quantity: "",
    Price: "",
    TotalExclGST: "",
    SalesTax: "",
    TotalInclGST: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddRecord = () => {
    let updatedPurchases = [...purchases];

    if (isEditMode) {
      updatedPurchases[editIndex] = formData;
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      updatedPurchases.push(formData);
    }

    setPurchases(updatedPurchases);
    resetForm();
    setShowModal(false);
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
  };

  const resetForm = () => {
    setFormData({
      SNo: "",
      StockCode: "",
      PackSize: "",
      BatchNo: "",
      ExpiryDate: new Date().toISOString().split("T")[0],
      Quantity: "",
      Price: "",
      TotalExclGST: "",
      SalesTax: "",
      TotalInclGST: "",
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Upzet" breadcrumbItem="Purchase" />
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
                  <div className="table-responsive">
                    <Table className="table-centered mb-0" striped bordered hover>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Stock Code / Description</th>
                          <th>Pack Size</th>
                          <th>Batch No</th>
                          <th>Expiry Date</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total Excl GST</th>
                          <th>Sales Tax</th>
                          <th>Total Incl GST</th>
                          <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchases.length === 0 ? (
                          <tr>
                            <td colSpan="11" className="text-center">
                              No records available
                            </td>
                          </tr>
                        ) : (
                          purchases.map((item, index) => (
                            <tr key={index}>
                              <td>{item.SNo}</td>
                              <td>{item.StockCode}</td>
                              <td>{item.PackSize}</td>
                              <td>{item.BatchNo}</td>
                              <td>{item.ExpiryDate}</td>
                              <td>{item.Quantity}</td>
                              <td>{item.Price}</td>
                              <td>{item.TotalExclGST}</td>
                              <td>{item.SalesTax}</td>
                              <td>{item.TotalInclGST}</td>
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
                  <Form.Label>S.No</Form.Label>
                  <Form.Control
                    type="text"
                    name="SNo"
                    value={formData.SNo}
                    onChange={(e) => setFormData({ ...formData, SNo: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Stock Code / Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="StockCode"
                    value={formData.StockCode}
                    onChange={(e) => setFormData({ ...formData, StockCode: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pack Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="PackSize"
                    value={formData.PackSize}
                    onChange={(e) => setFormData({ ...formData, PackSize: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Batch No</Form.Label>
                  <Form.Control
                    type="text"
                    name="BatchNo"
                    value={formData.BatchNo}
                    onChange={(e) => setFormData({ ...formData, BatchNo: e.target.value })}
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
                    name="ExpiryDate"
                    value={formData.ExpiryDate}
                    onChange={(e) => setFormData({ ...formData, ExpiryDate: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="Quantity"
                    value={formData.Quantity}
                    onChange={(e) => setFormData({ ...formData, Quantity: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="Price"
                    value={formData.Price}
                    onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Total Excl GST</Form.Label>
                  <Form.Control
                    type="number"
                    name="TotalExclGST"
                    value={formData.TotalExclGST}
                    onChange={(e) => setFormData({ ...formData, TotalExclGST: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sales Tax</Form.Label>
                  <Form.Control
                    type="number"
                    name="SalesTax"
                    value={formData.SalesTax}
                    onChange={(e) => setFormData({ ...formData, SalesTax: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Total Incl GST</Form.Label>
                  <Form.Control
                    type="number"
                    name="TotalInclGST"
                    value={formData.TotalInclGST}
                    onChange={(e) => setFormData({ ...formData, TotalInclGST: e.target.value })}
                    required
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