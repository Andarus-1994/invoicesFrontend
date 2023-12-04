export type InvoiceType = {
  id: number
  name: string
  client: string
  amount: number | string
  issue_date: string
  due_date: string
  client_address: string
}
