export function formatToMonthDay(dateInput: string | number | Date) {
  const date = new Date(dateInput); // Can take string, number, or Date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

// // Usage examples:
// console.log(formatToMonthDay("2025-07-07")); // "Jul 7"
// console.log(formatToMonthDay(new Date()));   // Today's date in "Mon DD"


export function* dateGenerator(startDate: Date = new Date()): Generator<Date> {
  let currentDate = new Date(startDate);

  while (true) {
    yield new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

const nextData = dateGenerator(new Date())

export const reportDates = [
  nextData.next().value.toLocaleDateString(),
  nextData.next().value.toLocaleDateString(),
  nextData.next().value.toLocaleDateString(),
  nextData.next().value.toLocaleDateString(),
  nextData.next().value.toLocaleDateString(),
  nextData.next().value.toLocaleDateString(),
  nextData.next().value.toLocaleDateString(),
]

export function isSameDate(date1: string | number | Date, date2: string | number | Date) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}