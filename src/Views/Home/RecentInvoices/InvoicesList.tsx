import "./InvoicesList.scss"
import { InvoiceType } from "../../../Components/Types/Invoice"

interface InvoicesListProps {
  invoices: InvoiceType[]
  selectInvoice: (invoice: InvoiceType) => void
}

export default function InvoicesList({ invoices, selectInvoice }: InvoicesListProps) {
  return (
    <>
      <div className="invoicesList">
        {invoices.map((invoice) => {
          return (
            <div className="invoiceItem" onClick={() => selectInvoice(invoice)}>
              <div className="client">
                <span>{invoice.client}</span> <span>$ {invoice.amount}</span>
              </div>
              <div className="details">
                <span>{invoice.date_created}</span> <span> Sent</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
