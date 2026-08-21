export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Format a Date object into UTC iCalendar timestamp (YYYYMMDDTHHMMSSZ)
 */
function formatToIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generate a direct web Google Calendar URL
 */
export function generateGoogleCalendarUrl(event: CalendarEventDetails): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${formatToIcsDate(event.startTime)}/${formatToIcsDate(event.endTime)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate and trigger download of a standard RFC 5545 .ics iCalendar file
 */
export function downloadIcsFile(event: CalendarEventDetails, fileName: string = 'wedding-event.ics'): void {
  const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@sheimasabir.wedding`;
  const now = formatToIcsDate(new Date());
  const start = formatToIcsDate(event.startTime);
  const end = formatToIcsDate(event.endTime);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sheima and Sabir Wedding//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// Predefined ceremony calendar configurations
export const HALDI_EVENT: CalendarEventDetails = {
  title: 'Haldi Ceremony — Sheima & Sabir Wedding',
  description: 'A joyful celebration of traditional turmeric blessings, fragrant floral decor, and celebratory music for Sheima Baig & Sabir Baig.',
  location: "At Our Residence (Bride's House), Jaipur, Rajasthan",
  startTime: new Date('2026-12-23T17:30:00+05:30'),
  endTime: new Date('2026-12-23T21:30:00+05:30'),
};

export const BARAT_EVENT: CalendarEventDetails = {
  title: 'The Barat & Nikah — Sheima & Sabir Wedding',
  description: 'Grand Nikah Ceremony & Royal Feast celebrating the wedding of Sheima Baig & Sabir Baig at Rose Garden, Jaipur. GPS Location: https://maps.app.goo.gl/7Y6TfdRtHpaHWaNM6?g_st=ac',
  location: 'Rose Garden, Jaipur, Rajasthan',
  startTime: new Date('2026-12-26T21:30:00+05:30'),
  endTime: new Date('2026-12-27T02:00:00+05:30'),
};

export const WALIMA_EVENT: CalendarEventDetails = {
  title: 'Walima Reception — Sheima & Sabir Wedding',
  description: "Grand Evening Reception & Celebratory Dinner hosted by the Groom's Family celebrating the union of Sheima Baig & Sabir Baig.",
  location: "At Groom's Residence, Jaipur, Rajasthan",
  startTime: new Date('2026-12-28T20:00:00+05:30'),
  endTime: new Date('2026-12-28T23:30:00+05:30'),
};
