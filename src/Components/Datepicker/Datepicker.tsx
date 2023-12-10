import * as React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { formatDate } from "../../Utils/DateFormat"

type DatePickerProps = {
  label: string
  value: string
  setDate: (date: string) => void
}

type DatePickerFormat = dayjs.Dayjs | null

export default function MyDatePicker({ label, value, setDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<DatePickerFormat>(null)

  const handleDateChange = (date: DatePickerFormat) => {
    console.log(date)
    setSelectedDate(date)
    if (date) {
      const formattedDate = formatDate(dayjs(date).format("DD/MM/YYYY"))
      setDate(formattedDate)
    }
  }

  React.useEffect(() => {
    if (value) setSelectedDate(dayjs(value, "DD/MM/YYYY"))
  }, [value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        format="DD/MM/YYYY"
        value={selectedDate}
        onChange={handleDateChange}
        sx={{ width: "100%" }}
        slotProps={{
          textField: { size: "small" },
          actionBar: {
            actions: ["clear", "today"],
          },
        }}
      />
    </LocalizationProvider>
  )
}
