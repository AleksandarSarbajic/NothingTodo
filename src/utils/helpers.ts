import {
  compareAsc,
  formatDistance,
  isSameDay,
  parse,
  parseISO,
} from "date-fns";
import { differenceInDays } from "date-fns/esm";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (
  dateStr1: string | null,
  dateStr2: string | null
) => differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export function isSameAsCurrentDate(dateToCheck: string | null): boolean {
  if (dateToCheck === null) {
    return false;
  }
  const currentDate = new Date();
  const parsedDateToCheck = parseISO(dateToCheck);

  return isSameDay(parsedDateToCheck, currentDate);
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
interface Options {
  end?: boolean;
}

export const getToday = function (options: Options = {}): string {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase because it is not at 0.0.0.0,
  // so we need to set the date to be END of the day when we compare it with earlier dates
  if (options && options.end) {
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};
export function formatTimeToDate(time: string) {
  const [hours, minutes, seconds] = time.split(":");

  const currentDate = new Date();
  currentDate.setHours(Number(hours));
  currentDate.setMinutes(Number(minutes));
  currentDate.setSeconds(Number(seconds));

  return currentDate;
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const compareTimes = (time1: string | null) => {
  if (time1 === null) {
    return 0;
  }

  const currentDate = new Date();
  const date = parse(time1, "HH:mm:ss", new Date());

  const comparisonResult = compareAsc(date, currentDate);

  return comparisonResult;
};
