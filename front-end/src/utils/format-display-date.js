export default function formatDisplayDate(date, format) {
  const dateObject = new Date(date);

  // takes the "YYYY-MM-DD" format, like "2021-08-10" and returns:

  // "Tue Aug 10 2021"
  if (!format) {
    return dateObject.toDateString();
  }

  // "Aug 10 (Tue)"
  if (format === "short") {
    const gotDate = dateObject.getDate();
    const gotDay = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(dateObject);
    const gotMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(dateObject);

    return `${gotMonth} ${gotDate} (${gotDay}) `;
  }

  // "Tuesday, Aug 10, 2021"
  if (format === "long") {
    console.log("alternate date formats: Tue Aug 10 2021 --or-- Aug 10 (Tue)");
    return dateObject.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
