export const metadata = {
  title: "Kalenteri - Sukeltajat ry",
  description:
    "Sukeltajat ry:n tapahtumakalenteri. Sukellusreissut, kerhoillat ja muut tapahtumat.",
};

import { getIcalendarData } from "@/lib/queries/calendar";
import { Suspense } from "react";

interface CalendarEvent {
  type: string;
  start: Date;
  end: Date;
  summary: string;
  description?: string;
  url?: string;
  uid: string;
}

function CalendarView({ events }: { events: CalendarEvent[] }) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Get first day of month and last day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  // Get the day of week for first day (0 = Sunday, 1 = Monday, etc.)
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Calculate how many days from previous month to show
  const daysFromPrevMonth = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  // Get first day to display (might be from previous month)
  const calendarStart = new Date(firstDayOfMonth);
  calendarStart.setDate(calendarStart.getDate() - daysFromPrevMonth);

  // Generate 42 days (6 weeks) for the calendar grid
  const calendarDays = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(calendarStart);
    day.setDate(calendarStart.getDate() + i);
    calendarDays.push(day);
  }

  // Group events by date
  const eventsByDate = new Map<string, CalendarEvent[]>();
  events.forEach((event) => {
    const dateKey = event.start.toISOString().split("T")[0];
    if (!eventsByDate.has(dateKey)) {
      eventsByDate.set(dateKey, []);
    }
    eventsByDate.get(dateKey)!.push(event);
  });

  const monthNames = [
    "Tammikuu",
    "Helmikuu",
    "Maaliskuu",
    "Huhtikuu",
    "Toukokuu",
    "Kesäkuu",
    "Heinäkuu",
    "Elokuu",
    "Syyskuu",
    "Lokakuu",
    "Marraskuu",
    "Joulukuu",
  ];

  const dayNames = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/20 shadow-2xl mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white text-center">
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-blue-200 font-medium p-2 text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentMonth;
          const isToday = day.toDateString() === now.toDateString();
          const dateKey = day.toISOString().split("T")[0];
          const dayEvents = eventsByDate.get(dateKey) || [];

          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 rounded-lg border transition-colors ${
                isCurrentMonth
                  ? "bg-white/5 border-blue-400/20 text-white"
                  : "bg-transparent border-blue-400/10 text-blue-300"
              } ${isToday ? "ring-2 ring-blue-400 bg-blue-500/20" : ""}`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  isToday ? "text-blue-100" : ""
                }`}
              >
                {day.getDate()}
              </div>

              {dayEvents.length > 0 && (
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <a
                      key={event.uid}
                      href={event.url || "#"}
                      target={event.url ? "_blank" : "_self"}
                      rel={event.url ? "noopener noreferrer" : undefined}
                      className="block text-xs bg-blue-500/80 hover:bg-blue-400/90 text-white px-1 py-0.5 rounded truncate transition-colors cursor-pointer"
                      title={`${event.summary} - Klikkaa avataksesi`}
                    >
                      {event.summary}
                    </a>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-blue-200">
                      +{dayEvents.length - 2} lisää
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-blue-400/20">
        <p className="text-blue-200 text-sm text-center">
          Klikkaa tapahtumaa kalenterissa avataksesi sen Nimenhuudossa
        </p>
      </div>
    </div>
  );
}

async function CalendarEvents() {
  const icalendarData = await getIcalendarData();

  if (!icalendarData) {
    return (
      <div className="text-center text-blue-100">
        Tapahtumien lataaminen epäonnistui. Yritä myöhemmin uudelleen.
      </div>
    );
  }

  const events = Object.values(icalendarData).filter(
    (item: any) => item.type === "VEVENT"
  ) as CalendarEvent[];

  if (events.length === 0) {
    return (
      <div className="text-center text-blue-100 py-8">
        <p className="text-lg">Ei tulevia tapahtumia</p>
        <p className="text-sm mt-2 opacity-80">
          Tarkista myöhemmin uudelleen tai käy Nimenhuudossa.
        </p>
      </div>
    );
  }

  return (
    <>
      <CalendarView events={events} />

      {/* Upcoming events list */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-6 text-center">
          Tulevat tapahtumat
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {events.slice(0, 8).map((event) => (
            <div
              key={event.uid}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20 shadow-lg hover:bg-white/15 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {event.summary}
                  </h4>
                  <p className="text-blue-100 mb-4 text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Intl.DateTimeFormat("fi-FI", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      weekday: "long",
                    }).format(new Date(event.start))}
                  </p>

                  {event.description && (
                    <div className="text-blue-200 mb-4 text-sm leading-relaxed whitespace-pre-line">
                      {event.description}
                    </div>
                  )}
                </div>

                {event.url && (
                  <div className="flex-shrink-0">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-blue-500/80 transition-all duration-200 group border border-blue-400/30"
                    >
                      Avaa Nimenhuudossa
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function KalenteriPage() {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100/10 backdrop-blur-sm text-blue-100 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-blue-400/20">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Tapahtumat
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Kalenteri
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Sukellusreissut, kerhoillat ja muut syvyyksien tapahtumat
          </p>
        </div>

        <Suspense
          fallback={
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/20 shadow-2xl mb-12 animate-pulse">
              <div className="mb-6">
                <div className="h-8 bg-blue-300/30 rounded w-48 mx-auto mb-4" />
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-6 bg-blue-300/20 rounded" />
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {[...Array(42)].map((_, i) => (
                  <div
                    key={i}
                    className="min-h-[80px] bg-blue-300/10 rounded-lg border border-blue-400/10"
                  />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-blue-400/20">
                <div className="h-4 bg-blue-300/20 rounded w-64 mx-auto" />
              </div>
            </div>
          }
        >
          <CalendarEvents />
        </Suspense>

        <div className="bg-blue-600/20 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-blue-400/30 shadow-2xl mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-3 text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            Ilmoittautumiset
          </h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Reissuja varten ilmoittautuminen tapahtuu Nimenhuuto-palvelussa.
            Voit kysellä reissujen järjestämistä myös suoraan kippareilta.
          </p>
          <a
            href="https://sukeltajat.nimenhuuto.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-blue-500/80 transition-all duration-200 group border border-blue-400/30"
          >
            Nimenhuuto
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-blue-400/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Sukellusreissut
            </h2>
            <p className="text-blue-100 mb-4">
              Reissupäivät ovat perinteisesti:
            </p>
            <ul className="space-y-3 text-blue-100 mb-6">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                <span>Torstai (iltareissu)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                <span>Lauantai (päiväreissu)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                <span>Sunnuntai (päiväreissu)</span>
              </li>
            </ul>
            <p className="text-blue-100 leading-relaxed">
              Tarkemmat tiedot reissuista ja niiden tilanteista löydät
              kalenterista. Käy katsomassa reissupäivän aamuna reissun tilanne.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-blue-400/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              Muut tapahtumat
            </h2>
            <p className="text-blue-100 mb-4">Talviaikaan järjestämme:</p>
            <ul className="space-y-3 text-blue-100 mb-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 mt-2"></span>
                <span>
                  Kerhoiltoja merellisistä ja sukelluksellisista teemoista
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 mt-2"></span>
                <span>Reissuja kaivoksiin</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 mt-2"></span>
                <span>Jääsukelluksia (mahdollisuuksien mukaan)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3 mt-2"></span>
                <span>Saunaillat ja muut iltamat</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-200 mb-6 text-lg">
            Täydellinen tapahtumakalenteri löytyy Nimenhuuto-palvelusta
          </p>
          <a
            href="https://sukeltajat.nimenhuuto.com/calendar/monthly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-blue-100 font-medium rounded-xl hover:bg-white/20 transition-all duration-200 group border border-blue-400/30"
          >
            Avaa kuukausikalenteri
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
