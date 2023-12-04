import moment from "moment"

export const formatDate = (dateToFormat: string) => {
  const possibleFormats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]
  const newDate = moment(dateToFormat, possibleFormats, true).format("DD/MM/YYYY")
  return newDate
}
