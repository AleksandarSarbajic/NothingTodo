import {
  compareAsc,
  eachDayOfInterval,
  eachMonthOfInterval,
  formatDistance,
  isSameDay,
  isSameMonth,
  parse,
  parseISO,
  subDays,
  subMonths,
} from "date-fns";
import { differenceInDays } from "date-fns/esm";
import { Database } from "../services/supabase";

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
export function sortByStatus(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"]
) {
  if (a.status === "completed" && b.status === "incomplete") {
    return 1;
  } else if (a.status === "incomplete" && b.status === "completed") {
    return -1;
  } else {
    return 0;
  }
}
export function sortByName(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  type: boolean
) {
  if (type) {
    return a.task_name.localeCompare(b.task_name);
  } else {
    if (a.task_name > b.task_name) {
      return -1;
    } else if (a.task_name < b.task_name) {
      return 1;
    } else {
      return 0;
    }
  }
}

export function sortByEditedAt(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  settings?: Database["public"]["Tables"]["settings"]["Row"]
) {
  const dateA = a.edited_at ? new Date(a.edited_at).getTime() : 0;
  const dateB = b.edited_at ? new Date(b.edited_at).getTime() : 0;
  if (settings?.newTaskOnTop) return dateB - dateA;

  return dateA - dateB;
}

export function sortByDueDate(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  ascending: boolean = true
) {
  const timestampA = calculateTimestamp(a.due_date, a.end_time);
  const timestampB = calculateTimestamp(b.due_date, b.end_time);

  return ascending ? timestampA - timestampB : timestampB - timestampA;
}

function calculateTimestamp(date: string | null, time: string | null): number {
  const combinedDateTime = date && time ? `${date}T${time}` : null;
  return combinedDateTime ? parseISO(combinedDateTime).getTime() : 0;
}

export function sortByPriority(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  settings?: Database["public"]["Tables"]["settings"]["Row"],
  type?: boolean
) {
  if (settings?.primaryTaskOnTop) {
    return comparePriority(a.priority, b.priority);
  } else {
    if (type) {
      return comparePriority(a.priority, b.priority);
    } else {
      return comparePriority(b.priority, a.priority);
    }
  }
}

function comparePriority(
  priorityA: boolean | null,
  priorityB: boolean | null
): number {
  if (priorityA === null && priorityB === null) {
    return 0;
  } else if (priorityA === null) {
    return 1;
  } else if (priorityB === null) {
    return -1;
  } else {
    return priorityA ? -1 : priorityB ? 1 : 0;
  }
}

export function sortByProgress(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  tasks: Database["public"]["Tables"]["Tasks"]["Row"][],
  completedStatus: string = "completed",
  descending: boolean = false
): number {
  const calculateProgress = (
    task: Database["public"]["Tables"]["Tasks"]["Row"]
  ): number => {
    const numberOfTasks = tasks.filter((t) => t.category === task.category);
    const completed = numberOfTasks.filter(
      (item) => item.status === completedStatus
    );
    return (completed.length / numberOfTasks.length) * 100;
  };

  const progressA = calculateProgress(a);
  const progressB = calculateProgress(b);

  return (progressB - progressA) * (descending ? -1 : 1);
}

export function sortByCategory(
  a: Database["public"]["Tables"]["Tasks"]["Row"],
  b: Database["public"]["Tables"]["Tasks"]["Row"],
  descending: boolean
): number {
  const categoryA = a.category || "";
  const categoryB = b.category || "";

  return descending
    ? categoryB.localeCompare(categoryA)
    : categoryA.localeCompare(categoryB);
}

export function analyticsInterval(numIntervals: number, type: string = "days") {
  if (type === "month") {
    const allMonths = eachMonthOfInterval({
      start: subMonths(new Date(), numIntervals - 1),
      end: new Date(),
    });

    return allMonths;
  } else {
    const allDates = eachDayOfInterval({
      start: subDays(new Date(), numIntervals - 1),
      end: new Date(),
    });
    return allDates;
  }
}

export function completedTasksForInterval(
  completedArray: string[] | null,
  numIntervals: number,
  type: string = "days"
) {
  const intervalStart =
    type === "month"
      ? subMonths(new Date(), numIntervals - 1)
      : subDays(new Date(), numIntervals - 1);
  const allIntervals =
    type === "month"
      ? eachMonthOfInterval({ start: intervalStart, end: new Date() })
      : eachDayOfInterval({ start: intervalStart, end: new Date() });

  const completedTasksPerInterval: number[] = allIntervals.map((interval) => {
    const tasksCompletedInInterval = completedArray
      ? completedArray.filter((completedDate) => {
          const completedDateObj = new Date(completedDate);
          return type === "month"
            ? isSameMonth(completedDateObj, interval)
            : isSameDay(completedDateObj, interval);
        })
      : [];

    return tasksCompletedInInterval.length;
  });

  return completedTasksPerInterval;
}
