import "./Invoice.scss"
import { useParams, useNavigate } from "react-router-dom"
import { invoicesArray } from "../../Data/Invoices"
import Input from "@mui/material/Input"
import { useEffect, useState } from "react"
import { InvoiceType, StatusInvoice } from "../../Components/Types/Invoice"
import MyDatePicker from "./../../Components/Datepicker/Datepicker"
import Select from "react-select"
import { ClientType } from "../../Components/Types/Client"
import { useClientsStore } from "./../../Store/clientsStore"

export default function InvoicePreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  console.log(id)
  console.log(invoicesArray)

  const clientsStore = useClientsStore((state) => state.clients)
  const loadingClients = useClientsStore((state) => state.loading)
  const fetchClientsStore = useClientsStore((state) => state.getClients)

  const getInvoiceDetails = () => {
    return invoicesArray.find((invoice) => invoice.id == id)
  }
  console.log(getInvoiceDetails())
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceType | undefined>(getInvoiceDetails())

  const getOption = (client: ClientType) => client.name

  useEffect(() => {
    fetchClientsStore()
  }, [fetchClientsStore])

  return (
    <div className="invoiceFlexContainer">
      <div className="invoicePreview">
        <h3>Invoice Preview for id {id}</h3>
        <div className="flexRow">
          <div className="invoiceName">
            <label>Invoice Name</label>
            <Input placeholder="Invoice Name" className="input" value={invoiceDetails?.name} />
          </div>
          <div>
            <label className="required">Status</label>
            <Select
              options={[
                { value: "In process", label: "In process" },
                { value: "Canceled", label: "Canceled" },
                { value: "Sent", label: "Sent" },
              ]}
              placeholder="Select a status"
              menuPlacement="top"
              value={{ value: invoiceDetails?.status, label: invoiceDetails?.status }}
              onChange={(event) => {
                const selectedOption = event?.value as StatusInvoice

                if (selectedOption && ["In process", "Sent", "Canceled", ""].includes(selectedOption) && invoiceDetails)
                  setInvoiceDetails({ ...invoiceDetails, status: selectedOption })
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  position: "relative",
                  minWidth: "215px",
                  padding: "0px 10px",
                  background: "#f5f5f5",
                  zIndex: "100",
                }),
              }}
            />
          </div>
          <div>
            <label className="required">Client</label>
            <Select
              options={clientsStore}
              getOptionLabel={getOption}
              getOptionValue={getOption}
              placeholder="Select a client"
              menuPlacement="top"
              isLoading={loadingClients}
              onChange={(event) => {
                if (event?.name !== undefined && invoiceDetails)
                  setInvoiceDetails({ ...invoiceDetails, client: event?.name.toString(), client_id: event?.id.toString() })
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  position: "relative",
                  padding: "0px 10px",
                  minWidth: "215px",
                  background: "#f5f5f5",
                  zIndex: "100",
                }),
              }}
            />
          </div>
        </div>
        <div className="flexRow">
          {" "}
          <div className="invoiceName">
            <label>Amount Total</label>
            <Input placeholder="Invoice Name" className="input" value={invoiceDetails?.amount} />
          </div>
          <div className="invoiceName">
            <label>Amount Paid</label>
            <Input placeholder="Invoice Name" className="input" value={invoiceDetails?.amount_paid} />
          </div>
        </div>
        <div className="datesInvoice">
          <MyDatePicker
            label={"Issue Date"}
            disabled
            setDate={(dateValueString) => {
              if (invoiceDetails) setInvoiceDetails({ ...invoiceDetails, issue_date: dateValueString })
            }}
            value={invoiceDetails?.issue_date ?? ""}
          />{" "}
          <MyDatePicker
            label={"Due Date"}
            setDate={(dateValueString) => {
              if (invoiceDetails) setInvoiceDetails({ ...invoiceDetails, due_date: dateValueString })
            }}
            value={invoiceDetails?.due_date ?? ""}
          />
        </div>
      </div>
      <div className="invoiceActions">
        <button className="back" onClick={() => navigate("/")}>
          Back
        </button>
        <button>Save</button>
      </div>
    </div>
  )
}
