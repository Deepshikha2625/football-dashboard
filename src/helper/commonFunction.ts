import moment from "moment";

export const generateDateTabs = () => {
  const dates = [];
  for (let i = -6; i <= 0; i++) {
    const date = moment().add(i, "days"); // Get past 6 days including today
    let label = date.format("ddd DD MMM"); // Example: "Wed 09 Aug"

    if (i === -1) label = `Yesterday ${date.format("DD MMM")}`;
    if (i === 0) label = `Today ${date.format("DD MMM")}`;

    dates.push({ label, value: date.format("YYYY-MM-DD") });
  }
  return dates;
};

