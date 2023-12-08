import * as React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { formatDate } from "../../Utils/DateFormat"

type DatePickerProps = {
  label: string
  setDate: (date: string) => void
}

export default function MyDatePicker({ label, setDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  const handleDateChange = (date: Date | null) => {
    console.log(date)
    setSelectedDate(date)
    if (date) {
      const formattedDate = formatDate(dayjs(date).format())
      setDate(formattedDate)
    }
  }

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
            actions: ["clear"],
          },
        }}
      />
    </LocalizationProvider>
  )
}
