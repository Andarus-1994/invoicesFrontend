import { useEffect, useRef, useState } from "react"
import "./newInvoiceModal.scss"
import Select from "react-select"
import { InvoiceType } from "../../../Components/Types/Invoice"
import MyDatePicker from "../../../Components/Datepicker/Datepicker"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia"
import { IoCloseSharp } from "react-icons/io5"
import LoadingSpinner from "../../../Components/Loading/Loading"
import { makeAPIcall } from "../../../Utils/API"
import { formatDate } from "../../../Utils/DateFormat"
import ItemsInvoice from "./ItemsInvoice"
import { ItemInvoiceType } from "../../../Components/Types/ItemInvoice"

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

  // list of the Items for the modal
  const [itemsInvoices, setItemsInvoices] = useState<ItemInvoiceType[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [newInvoice, setNewInvoice] = useState<InvoiceType>({
    id: "",
    name: "",
    amount: "0",
    amount_paid: "",
    due_date: "",
    issue_date: formatDate(),
    client: "",
    client_id: "",
    address: "",
    company_name: "",
    company_address: "",
    status: "In process",
  })
  const clients: ClientType[] = [
    {
      id: "1",
      name: "Victor Houdini",
      address: "Test Address",
      company_address: "Company address, test for sure",
    },
    {
      id: "2",
      name: "Alissa Houdini",
      address: "No name Address",
      company_address: "Company address 44, test for sure",
    },
    {
      id: "3",
      name: "Rick Minas",
      address: "No name Address 2",
      company_address: "Company address 44, test for sure",
    },
    {
      id: "4",
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

  useEffect(() => {
    console.log("testRender")
    const amount = itemsInvoices.reduce((sum, item) => sum + Number(item.price), 0)
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, amount: amount.toFixed(2) }))
  }, [itemsInvoices])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, [event.target.name]: newValue }))
  }

  const handleAmountBlur = () => {
    const cleanedAmount = newInvoice.amount.toString().replace(/[^0-9.]/g, "")
    let formattedAmount = parseFloat(cleanedAmount).toFixed(2)

    if (isNaN(Number(formattedAmount))) formattedAmount = "0"
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, amount: formattedAmount }))
  }

  const createInvoice = async () => {
    const DataObject = { ...newInvoice, items: itemsInvoices }
    const validation = checkValidationFields(DataObject)

    if (!validation) {
      setError("Please complete all the fields.")
      return
    }
    setError("")
    setLoading(true)
    const response = await makeAPIcall("/invoices/create", "POST", DataObject)

    if (response.error) {
      setError(response.errorObject.message)
    } else {
      closeModal()
      refreshInvoices()
    }
    setLoading(false)
  }

  const checkValidationFields = (objectInvoice: { items: ItemInvoiceType[] } & InvoiceType) => {
    const fieldsToValidate: (keyof typeof objectInvoice)[] = ["name", "client_id", "issue_date", "due_date", "items", "amount"]
    const validation = fieldsToValidate.every((field) => (field === "items" ? objectInvoice[field].length : objectInvoice[field] !== ""))

    return validation
  }

  const handleEscClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  const getOption = (client: ClientType) => client.name

  const [showItemsModal, setShowItemsModal] = useState(false)

  return (
    <>
      <div className="coverModal" onClick={closeModal}></div>
      <div className="newInvoiceModal" onKeyDown={handleEscClose} tabIndex={0} ref={modalRef}>
        <IoCloseSharp className="close-icon" onClick={closeModal} />
        <LiaFileInvoiceDollarSolid />
        <h3>New Invoice</h3>
        <div>
          <label className="required">Client</label>
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
                border: error && !newInvoice.client_id ? "1px solid #d33030" : "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.3)",
                zIndex: "100",
              }),
            }}
          />
        </div>
        <InputLabel htmlFor="outlined-input" size="small" className="required">
          Invoice Name
        </InputLabel>
        <OutlinedInput
          id="outlined-input"
          color="primary"
          size="small"
          error={!!error && !newInvoice.name}
          placeholder="ex: Electricity Bill"
          name="name"
          value={newInvoice.name}
          onChange={handleInputChange}
          sx={{ width: "100%" }} // Add some margin to push the input down
        />
        <div className="amountInput">
          <div>
            <InputLabel htmlFor="outlined-input" size="small" sx={{ bottom: "16px" }} className="required">
              Total Amount
            </InputLabel>
            <OutlinedInput
              id="outlined-input"
              color="primary"
              size="small"
              name="amount"
              placeholder="244.50"
              disabled={true}
              value={newInvoice.amount}
              onBlur={handleAmountBlur}
              onChange={handleInputChange}
              endAdornment={<InputAdornment position="end">$</InputAdornment>}
              sx={{ marginBottom: "25px", width: "100%" }} // Add some margin to push the input down
            />
          </div>
          <button onClick={() => setShowItemsModal(!showItemsModal)} className={error && newInvoice.amount === "0.00" ? "error" : ""}>
            {showItemsModal ? "Hide" : "View"} Items ({itemsInvoices.length})
          </button>
        </div>
        <div style={{ display: "flex", gap: "20px", maxWidth: "400px" }}>
          <MyDatePicker
            label={"Issue Date"}
            setDate={(dateValueString) => {
              setNewInvoice({ ...newInvoice, issue_date: dateValueString })
            }}
            error={!!error && !newInvoice.issue_date}
            value={newInvoice.issue_date}
          />
          <MyDatePicker
            label={"Due Date"}
            setDate={(dateValueString) => {
              setNewInvoice({ ...newInvoice, due_date: dateValueString })
            }}
            error={!!error && !newInvoice.due_date}
            value={newInvoice.due_date}
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
        {showItemsModal && (
          <ItemsInvoice
            setItem={(newItem) => setItemsInvoices([...itemsInvoices, newItem])}
            items={itemsInvoices}
            close={() => setShowItemsModal(false)}
          />
        )}
      </div>
    </>
  )
}
