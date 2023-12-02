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
        <div className="scrollbar">
          {invoices.map((invoice) => {
            return (
              <div className="invoiceItem" key={invoice.id}>
                <div className="client">
                  <span onClick={() => selectInvoice(invoice)}>{invoice.client}</span> <span>$ {invoice.amount}</span>
                </div>
                <div className="details">
                  <span>{invoice.date_created}</span> <span> Sent</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
