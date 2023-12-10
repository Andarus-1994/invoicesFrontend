import moment from "moment"

export const formatDate = (dateToFormat?: string) => {
  const today = moment()
  const possibleFormats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ss.SSSZ"]

  const parsedDate = dateToFormat ? moment(dateToFormat, possibleFormats, true) : today

  const newDate = parsedDate.format("DD/MM/YYYY")
  return newDate
}
