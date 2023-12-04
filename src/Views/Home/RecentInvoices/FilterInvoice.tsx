import "./FilterInvoice.scss"
import Select from "react-select"
import { TiDocumentAdd } from "react-icons/ti"

type FilterInvoiceProps = {
  filterInvoices: (filter: string) => void
}

export default function FilterInvoice({ filterInvoices }: FilterInvoiceProps) {
  const filterInvoicesOptions = [
    { value: "", label: "All" },
    { value: 7, label: "Last 7 days" },
    { value: 30, label: "Last month" },
    { value: 60, label: "Last 2 months" },
  ]

  const filterEvent = async (filter: string) => {
    console.log("test")
    filterInvoices(filter)
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
            if (event?.value !== undefined) filterEvent(event?.value.toString())
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
        <button>
          <span>New</span> <TiDocumentAdd />
        </button>
      </div>
    </div>
  )
}
