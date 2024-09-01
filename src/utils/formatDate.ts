import { format } from "date-fns";

export const formatDate = (isoString: string | null) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return format(date, "PPpp");
};