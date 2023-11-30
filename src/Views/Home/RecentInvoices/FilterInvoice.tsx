import { useState } from "react"
import "./FilterInvoice.scss"
import Select from "react-select"
import { TiDocumentAdd } from "react-icons/ti"
import { makeAPIcall } from "../../../Utils/API"

export default function RecentInvoices() {
  const [invoicesPeriod, setInvoicesPeriod] = useState<string | number | undefined>("")
  const filterInvoicesOptions = [
    { value: "", label: "All" },
    { value: 7, label: "Last 7 days" },
    { value: 30, label: "Last month" },
  ]

  const testApi = () => {
    makeAPIcall("testr", "GET")
  }

  return (
    <div className="filterInvoice">
      <label>Invoice</label>
      <div className="actionBar">
        <Select
          options={filterInvoicesOptions}
          placeholder="Time Period"
          onChange={(event) => {
            console.log(event)
            setInvoicesPeriod(event?.value)
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
        {invoicesPeriod}
        <button onClick={testApi}>
          <span>New</span> <TiDocumentAdd />
        </button>
      </div>
    </div>
  )
}
