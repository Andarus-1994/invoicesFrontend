import { useEffect, useRef, useState } from "react"
import "./FilterInvoice.scss"
import "./newInvoiceModal.scss"
import Select from "react-select"
import { InvoiceType } from "../../../Components/Types/Invoice"
import MyDatePicker from "../../../Components/Datepicker/Datepicker"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia"
import LoadingSpinner from "../../../Components/Loading/Loading"
import { makeAPIcall } from "../../../Utils/API"

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
  const modalRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus()
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, [event.target.name]: newAmount }))
  }

  const handleAmountBlur = () => {
    const cleanedAmount = newInvoice.amount.toString().replace(/[^0-9.]/g, "")
    let formattedAmount = parseFloat(cleanedAmount).toFixed(2)

    if (isNaN(Number(formattedAmount))) formattedAmount = "0"
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, amount: formattedAmount }))
  }

  const createInvoice = async () => {
    setError("")
    setLoading(true)
    const response = await makeAPIcall("/invoices/create", "POST", newInvoice)
    console.log(response)
    if (response.error) {
      setError(response.errorObject.message)
    }
    refreshInvoices()
    setLoading(false)
  }

  const handleEscClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  const getOption = (client: ClientType) => client.name

  return (
    <>
      <div className="coverModal" onClick={closeModal}></div>
      <div className="newInvoiceModal" onKeyDown={handleEscClose} tabIndex={0} ref={modalRef}>
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
          name="name"
          value={newInvoice.name}
          onChange={handleInputChange}
          sx={{ width: "100%" }} // Add some margin to push the input down
        />

        <InputLabel htmlFor="outlined-input" size="small">
          Amount
        </InputLabel>
        <OutlinedInput
          id="outlined-input"
          color="primary"
          size="small"
          name="amount"
          placeholder="244.50"
          value={newInvoice.amount}
          onBlur={handleAmountBlur}
          onChange={handleInputChange}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
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
        <div className="footer">
          <p className="error"> {error}</p>
          <button className={loading ? "disabled" : ""} onClick={createInvoice}>
            {loading ? (
              <>
                <LoadingSpinner /> Creating Invoice
              </>
            ) : (
              "Create Invoice"
            )}
          </button>
        </div>
      </div>
    </>
  )
}
