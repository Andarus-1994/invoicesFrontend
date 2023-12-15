export type InvoiceType = {
  id: string | number
  name: string
  amount: number | string
  amount_paid: number | string
  issue_date: string
  due_date: string
  client?: string
  client_id?: string | number
  address?: string
  company_name: string
  company_address: string
  status: StatusInvoice
}

type StatusInvoice = "In process" | "Sent" | "Canceled" | ""
