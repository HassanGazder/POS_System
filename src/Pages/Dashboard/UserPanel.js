import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import CreateInvoice from "./CreateInvoice";
import Createquotation from "./Createquotation";
import CreateSalesInvoice from "./CreateSalesInvoice";

const UserPanel = ({ transactions }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInvoiceSelection = (type) => {
    setModalOpen(false); // Close modal first
    setSelectedInvoice(null); // Reset selection
    setDropdownOpen(false); // Close dropdown

    setTimeout(() => {
      setSelectedInvoice(type);
      setModalOpen(true);
    }, 200); // Small delay to prevent UI glitches
  };

  // const renderModalContent = () => {
  //   if (!selectedInvoice) return null;
  //   switch (selectedInvoice) {
  //     case "invoice":
  //       return <CreateInvoice transactions={transactions} />;
  //     case "quotation":
  //       return <Createquotation transactions={transactions} />;
  //     case "sales":
  //       return <CreateSalesInvoice transactions={transactions} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <React.Fragment>
      <Row>
        {/* Total Payment */}
        <Col xl={3} sm={6}>
          <Card className="h-100 w-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart1 />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Payment</p>
                  <h5 className="mb-3">5000</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* bank */}
        <Col xl={3} sm={6}>
          <Card className="h-100 w-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart1 />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Bank</p>
                  <h5 className="mb-3">5000</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        {/* salleries */}
        <Col xl={3} sm={6}>
          <Card className="h-100 w-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart1 />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Salleries</p>
                  <h5 className="mb-3">5000</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Expense */}
        <Col xl={3} sm={6}>
          <Card className="h-100 w-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2 />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Expense</p>
                  <h5 className="mb-3">1500</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Create Invoice Box */}
        <Col xl={3} sm={6} className="mt-4">
          <Card className="h-100 w-100 shadow-lg border-primary">
            <CardBody className="d-flex flex-column text-center">
              <h5 className="mb-3 text-primary">Create Invoice Options</h5>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret color="primary">
                  Create Invoice
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => handleInvoiceSelection("invoice")}
                  >
                    Create Invoice
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleInvoiceSelection("quotation")}
                  >
                    Create Quotation
                  </DropdownItem>
                  <DropdownItem onClick={() => handleInvoiceSelection("sales")}>
                    Create Sales Invoice
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>
          {selectedInvoice
            ? `Create ${
                selectedInvoice.charAt(0).toUpperCase() +
                selectedInvoice.slice(1)
              }`
            : ""}
        </ModalHeader>
        <ModalBody>
          {selectedInvoice === "invoice" && (
            <CreateInvoice transactions={transactions} onClose={toggleModal} />
          )}
          {selectedInvoice === "quotation" && (
            <Createquotation
              transactions={transactions}
              onClose={toggleModal}
            />
          )}
          {selectedInvoice === "sales" && (
            <CreateSalesInvoice
              transactions={transactions}
              onClose={toggleModal}
            />
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default UserPanel;
