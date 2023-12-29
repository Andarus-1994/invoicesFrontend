export const formatCurrency = (number: string | number) => {
  let numberValue = number

  if (!isNaN(Number(number))) {
    numberValue = parseFloat(String(number))
  }
  if (!number) numberValue = 0

  return numberValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
