import "./Transactions.scss"

export default function Transactions() {
  const dataForTest = [
    {
      client: "Lucifer MorningStar",
      item: "Website Development",
      invoice_id: 24,
      status: "Pending",
      amount: 2400,
      paid_date: "17.06.2023",
    },
    {
      client: "Diana Prince",
      item: "Graphic Design",
      invoice_id: 25,
      status: "Paid",
      amount: 1800,
      paid_date: "02.08.2023",
    },
    {
      client: "Tony Stark",
      item: "Mobile App Development",
      invoice_id: 26,
      status: "Pending",
      amount: 3500,
      paid_date: "",
    },
    {
      client: "Selina Kyle",
      item: "SEO Services",
      invoice_id: 27,
      status: "Pending",
      amount: 1200,
      paid_date: "",
    },
    {
      client: "Bruce Wayne",
      item: "E-commerce Website",
      invoice_id: 28,
      status: "Paid",
      amount: 5000,
      paid_date: "10.09.2023",
    },
  ]
  return (
    <div className="transactions">
      <h4>Transactions</h4>
      {dataForTest.map((transaction) => (
        <div className="transactionsRow" key={transaction.invoice_id}>
          <div className="clientDetails">
            <h4>{transaction.client}</h4>
            <span>{transaction.item}</span>
          </div>
          <div className="invoiceDetails">
            <div className="link">View Invoice</div>
            <span>{transaction.invoice_id}</span>
          </div>
          <div className="statusBox">
            <div className={"status " + transaction.status.toLocaleLowerCase()}> {transaction.status}</div>
          </div>
          <div className="paymentDetails">
            <h4>$ {transaction.amount}</h4>
            <span>{transaction.paid_date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
