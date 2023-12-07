import { useState } from "react"
import "./FilterInvoice.scss"
import "./newInvoiceModal.scss"
import Select from "react-select"
import { InvoiceType } from "../../../Components/Types/Invoice"
import MyDatePicker from "../../../Components/Datepicker/Datepicker"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia"

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
  const [newInvoice, setNewInvoice] = useState<InvoiceType>({
    id: "",
    name: "",
    amount: "",
    amount_paid: "",
    due_date: "",
    issue_date: "",
    client: "",
    client_id: "",
    status: "In process",
  })
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
        <LiaFileInvoiceDollarSolid />
        <h3>New Invoice</h3>
        <div>
          <label>Client</label>
          <Select
            options={clients}
            getOptionLabel={getOption}
            getOptionValue={getOption}
            placeholder="Select a client"
            menuPlacement="top"
            onChange={(event) => {
              console.log(event)
              if (event?.name !== undefined) setNewInvoice({ ...newInvoice, client: event?.name.toString(), client_id: event?.id.toString() })
            }}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                position: "relative",
                minWidth: "220px",
                padding: "0px 10px",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
                zIndex: "100",
              }),
            }}
          />
        </div>

        <InputLabel htmlFor="outlined-input" size="small">
          Invoice Name
        </InputLabel>
        <OutlinedInput
          id="outlined-input"
          color="primary"
          size="small"
          placeholder="ex: Electricity Bill"
          sx={{ width: "100%" }} // Add some margin to push the input down
        />

        <InputLabel htmlFor="outlined-input" size="small">
          Amount $
        </InputLabel>
        <OutlinedInput
          id="outlined-input"
          color="primary"
          size="small"
          placeholder="244.50"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          sx={{ marginBottom: "25px", width: "100%" }} // Add some margin to push the input down
        />

        <div style={{ display: "flex", gap: "20px", maxWidth: "400px" }}>
          <MyDatePicker
            label={"Issue Date"}
            setDate={(dateValueString) => {
              setNewInvoice({ ...newInvoice, issue_date: dateValueString })
            }}
          />
          <MyDatePicker
            label={"Due Date"}
            setDate={(dateValueString) => {
              setNewInvoice({ ...newInvoice, issue_date: dateValueString })
            }}
          />
        </div>
        <button onClick={refreshInvoices}>Create Invoice</button>
      </div>
    </>
  )
}
