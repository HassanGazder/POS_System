import React, { useContext, useState } from "react";
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
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import CreateInvoice from "./CreateInvoice";
import Createquotation from "./Createquotation";
import CreateSalesInvoice from "./CreateSalesInvoice";
import { DashboardContext } from "../../Pages/Dashboard/DashboardContext";
import CreatePurchaseInvoice from "./CreatePurchaseInvoice";

const UserPanel = () => {
  const {purchases} = useContext(DashboardContext)
  const { transactions } = useContext(DashboardContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const [selectedBankName, setSelectedBankName] = useState("Select a Bank");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleBankDropdown = () => setBankDropdownOpen(!bankDropdownOpen);

  const handleInvoiceSelection = (type) => {
    setModalOpen(false); // Close modal first
    setSelectedInvoice(null); // Reset selection
    setDropdownOpen(false); // Close dropdown

    setTimeout(() => {
      setSelectedInvoice(type);
      setModalOpen(true);
    }, 200); // Small delay to prevent UI glitches
  };

  const handleBankSelection = (bankName) => {
    setSelectedBankName(bankName);
  };
  const banksInPakistan = [
    "HBL - Habib Bank Limited",
    "MCB - Muslim Commercial Bank",
    "UBL - United Bank Limited",
    "Allied Bank",
    "Bank Alfalah",
    "Meezan Bank",
    "Standard Chartered",
    "Faysal Bank",
    "Askari Bank",
    "National Bank of Pakistan (NBP)",
  ];

  return (
    <React.Fragment>
      <Row>
        {/* Expense */}
        <Col xl={3} sm={6}>
          <Card className="h-100 w-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart1 />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Expense</p>
                  <h5 className="mb-3">5000</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Salleries */}
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
        {/* salleries */}

        {/* bank */}
        <Col xl={3} sm={6}>
          <Card className="h-100 w-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center"></div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Bank</p>
                  <h5 className="mb-3">{selectedBankName}</h5>
                </div>
              </div>

              {/* Dropdown Button with Bank Icon */}
              <Dropdown
                isOpen={bankDropdownOpen}
                toggle={toggleBankDropdown}
                className="mt-3"
              >
                <DropdownToggle color="primary" caret block>
                  <FontAwesomeIcon icon={faUniversity} className="me-2" />{" "}
                  {/* Bank Icon */}
                  Select Bank
                </DropdownToggle>
                <DropdownMenu>
                  {banksInPakistan.map((bank, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleBankSelection(bank)}
                    >
                      {bank}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
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
                  <p className="mb-1">Total Payment</p>
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
                  <DropdownItem
                    onClick={() => handleInvoiceSelection("purchase")}
                  >
                    Create Purchase Invoice
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
          {selectedInvoice === "purchase" && (
            <CreatePurchaseInvoice isOpen={modalOpen} toggle={toggleModal} purchases={purchases} />
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default UserPanel;
