import { ClientType } from "../../Components/Types/Client"
import { InvoiceType, StatusInvoice } from "../../Components/Types/Invoice"
import Input from "@mui/material/Input"
import MyDatePicker from "../../Components/Datepicker/Datepicker"
import Select from "react-select"
import { useClientsStore } from "../../Store/clientsStore"
import { useEffect } from "react"

type InvoiceDetailsProps = {
  errorMessage: string
  invoiceDetails: InvoiceType | null
  updateInvoiceDetails: (invoiceDetails: InvoiceType) => void
}

export default function InvoiceDetails({ errorMessage, invoiceDetails, updateInvoiceDetails }: InvoiceDetailsProps) {
  const fetchClientsStore = useClientsStore((state) => state.getClients)

  const clientsStore = useClientsStore((state) => state.clients)
  const loadingClients = useClientsStore((state) => state.loading)

  const getOption = (client: ClientType) => client.name
  const getOptionValue = (client: ClientType) => client.id

  useEffect(() => {
    fetchClientsStore()
  }, [fetchClientsStore])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (invoiceDetails) {
      const newValue = event.target.value
      updateInvoiceDetails({ ...invoiceDetails, [event.target.name]: newValue })
    }
  }

  const handleAmountPaid = () => {
    if (!invoiceDetails) return
    if (Number(invoiceDetails?.amount_paid) > Number(invoiceDetails?.amount)) {
      updateInvoiceDetails({ ...invoiceDetails, amount_paid: invoiceDetails.amount })
    }
  }

  if (invoiceDetails === null)
    return (
      <div className="invoicePreview">
        <div className="error" style={{ minWidth: "800px" }}>
          {errorMessage}
        </div>
      </div>
    )
  return (
    <div className="invoicePreview">
      <h3>Invoice Preview for id {invoiceDetails.id}</h3>
      <div className="flexRow">
        <div className="invoiceName">
          <label>Invoice Name</label>
          <Input placeholder="Invoice Name" onChange={handleInputChange} name="name" className="input" value={invoiceDetails?.name} />
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
                updateInvoiceDetails({ ...invoiceDetails, status: selectedOption })
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
            getOptionValue={getOptionValue}
            value={invoiceDetails ? clientsStore.find((client) => client.id === invoiceDetails.client_id) : null}
            placeholder="Select a client"
            menuPlacement="top"
            isLoading={loadingClients}
            onChange={(event) => {
              if (event?.name !== undefined && invoiceDetails)
                updateInvoiceDetails({ ...invoiceDetails, client: event?.name.toString(), client_id: event?.id.toString() })
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
          <Input placeholder="Amount Total" onChange={handleInputChange} className="input" name="amount" value={invoiceDetails?.amount} />
        </div>
        <div className="invoiceName">
          <label>Amount Paid</label>
          <Input
            placeholder="Amount Paid"
            onChange={handleInputChange}
            onBlur={handleAmountPaid}
            className="input"
            name="amount_paid"
            value={invoiceDetails?.amount_paid}
          />
        </div>
      </div>
      <div className="datesInvoice">
        <MyDatePicker
          label={"Issue Date"}
          disabled
          setDate={(dateValueString) => {
            if (invoiceDetails) updateInvoiceDetails({ ...invoiceDetails, issue_date: dateValueString })
          }}
          value={invoiceDetails?.issue_date ?? ""}
        />{" "}
        <MyDatePicker
          label={"Due Date"}
          setDate={(dateValueString) => {
            if (invoiceDetails) updateInvoiceDetails({ ...invoiceDetails, due_date: dateValueString })
          }}
          value={invoiceDetails?.due_date ?? ""}
        />
      </div>
    </div>
  )
}
