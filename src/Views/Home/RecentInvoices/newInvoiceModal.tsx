import { useState } from "react"
import "./FilterInvoice.scss"
import "./newInvoiceModal.scss"
import Select from "react-select"
import { InvoiceType } from "../../../Components/Types/Invoice"

type NewInvoiceModalProps = {
  refreshInvoices: () => void
  closeModal: () => void
}

type ClientType = {
  id: string
  name: string
  address: string
  company_address: string
}
export default function NewInvoiceModal({ refreshInvoices, closeModal }: NewInvoiceModalProps) {
  const [newInvoice, setNewInvoice] = useState<InvoiceType>({ id: "", name: "", amount: "", due_date: "", issue_date: "", client: "", client_id: "" })
  const clients: ClientType[] = [
    {
      id: "24",
      name: "Victor Houdini",
      address: "Test Address",
      company_address: "Company address, test for sure",
    },
    {
      id: "34",
      name: "Alissa Houdini",
      address: "No name Address",
      company_address: "Company address 44, test for sure",
    },
    {
      id: "45",
      name: "Rick Minas",
      address: "No name Address 2",
      company_address: "Company address 44, test for sure",
    },
    {
      id: "45",
      name: "Thomas Edison",
      address: "No name Address 2",
      company_address: "Company address 44, test for sure",
    },
  ]

  const getOption = (client: ClientType) => client.name

  return (
    <>
      <div className="coverModal" onClick={closeModal}></div>
      <div className="newInvoiceModal">
        <h3>Create new invoice will be here</h3>
        <div>
          <label>Clients</label>
          <Select
            options={clients}
            getOptionLabel={getOption}
            getOptionValue={getOption}
            placeholder="Clients"
            onChange={(event) => {
              console.log(event)
              if (event?.name !== undefined) setNewInvoice({ ...newInvoice, client: event?.name.toString(), client_id: event?.id.toString() })
            }}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                minWidth: "220px",
                padding: "0px 10px",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
              }),
            }}
          />
        </div>
        <button onClick={refreshInvoices}>Create</button>
      </div>
    </>
  )
}
