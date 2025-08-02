// @ts-ignore - node-ical doesn't have proper types
import ical from "node-ical";

interface CalendarEvent {
  type: string;
  start: Date;
  end: Date;
  summary: string;
  description?: string;
  url?: string;
  uid: string;
}

export const getIcalendarData = async (): Promise<Record<
  string,
  CalendarEvent
> | null> => {
  try {
    const response = await fetch(
      `https://sukeltajat.nimenhuuto.com/calendar/ical`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const jsonDataRaw = ical.parseICS(data);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const jsonData: Record<string, any> = {};
    for (const key in jsonDataRaw) {
      const entry = jsonDataRaw[key];
      if (entry.type === "VEVENT" && entry.start instanceof Date) {
        // Remove "Sukeltajat:" from the beginning of the summary if present.
        if (
          typeof entry.summary === "string" &&
          entry.summary.startsWith("Sukeltajat:")
        ) {
          entry.summary = entry.summary.replace(/^Sukeltajat:\s*/, "");
        }
        if (entry.start >= todayStart) {
          jsonData[key] = entry;
        }
      } else {
        jsonData[key] = entry;
      }
    }
    console.log("Parsed iCalendar data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching iCalendar data:", error);
    return null;
  }
};
