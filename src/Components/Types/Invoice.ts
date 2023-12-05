export type InvoiceType = {
  id: string
  name: string
  amount: number | string
  issue_date: string
  due_date: string
  client?: string
  client_id?: string | number
  client_address?: string
}
