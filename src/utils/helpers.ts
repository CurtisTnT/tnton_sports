export const formatVndCurrency = (cur: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(cur);
};

export const formatDateTime = (date: string | Date) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
