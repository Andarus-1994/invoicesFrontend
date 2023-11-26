import { useState } from "react"
import "./RecentInvoices.scss"
import Select from "react-select"
import { TiDocumentAdd } from "react-icons/ti"
import InvoicesList from "./InvoicesList"

export default function RecentInvoices() {
  const [invoicesPeriod, setInvoicesPeriod] = useState<string | number | undefined>("")
  const filterInvoicesOptions = [
    { value: "", label: "All" },
    { value: 7, label: "Last 7 days" },
    { value: 30, label: "Last month" },
  ]

  const InvoicesArray = [
    { id: 1, name: "Electricity  Bill", client: "Electron Plus", amount: 2500 },
    { id: 1, name: "Invoice 245", client: "Bill Bro", amount: 1200 },
    { id: 1, name: "Water Bill", client: "Water Well", amount: 1750 },
  ]
  return (
    <>
      <div className="recentInvoices">
        <div>
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
            <button>
              <span>New</span> <TiDocumentAdd />
            </button>
          </div>
          <InvoicesList invoices={InvoicesArray} />
        </div>
      </div>
    </>
  )
}
