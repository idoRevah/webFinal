const dateToPostString = (date: Date): string => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export { dateToPostString };
