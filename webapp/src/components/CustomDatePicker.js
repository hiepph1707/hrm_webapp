import DatePicker from "react-datepicker";
import {useState} from 'react'
import {getYear,getMonth} from "date-fns";


function CustomDatePicker(){
  const range = (start, end) => {
    return new Array(end - start).fill().map((d, i) => i + start);
  }
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ];
  return (
    <DatePicker
      dateFormat="MM/yyyy"
      showMonthYearPicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>{
              changeMonth(months.indexOf(value))
              // setStartDate(value)
            }}
          >
            {months.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
}

export default CustomDatePicker
