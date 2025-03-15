const dateToPostString = (date: Date): string => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  // @ts-ignore
  return date.toLocaleDateString("en-US", options);
};

export { dateToPostString };
