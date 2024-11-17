export default function formatDate(date) {
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Pad the month and day with leading zeros if needed
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${formattedMonth}-${formattedDay}-${year}`;
}