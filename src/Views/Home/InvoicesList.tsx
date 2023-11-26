import "./InvoicesList.scss"

type Invoice = {
  id: number
  name: string
  client: string
  amount: number | string
}

interface InvoicesListProps {
  invoices: Invoice[] // Corrected the type declaration
}

export default function InvoicesList({ invoices }: InvoicesListProps) {
  return (
    <>
      <div className="invoicesList">
        {invoices.map((invoice) => {
          return (
            <div className="invoiceItem">
              <div className="client">
                <span>{invoice.client}</span> <span>$ {invoice.amount}</span>
              </div>
              <div className="details">
                <span>20/12/2023</span> <span> Sent</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
