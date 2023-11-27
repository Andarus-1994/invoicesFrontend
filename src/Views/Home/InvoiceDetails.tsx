import { useState } from "react"
import "./InvoiceDetails.scss"

export default function InvoiceDetails() {
  const [invoice] = useState(14120)
  return (
    <>
      <div className="invoiceDetails">
        <h3>Status : Sent</h3>
        <h4>Invoice number: #{invoice}</h4>
        Details will be here
      </div>
    </>
  )
}
