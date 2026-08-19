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
  description: 'A joyful morning celebration of turmeric blessings, love, and traditional floral decor for Sheima Baig & Sabir Baig.',
  location: "At Our Residence (Bride's House)",
  startTime: new Date('2026-12-23T10:00:00+05:30'),
  endTime: new Date('2026-12-23T14:00:00+05:30'),
};

export const BARAT_EVENT: CalendarEventDetails = {
  title: 'Barat Ceremony (Nikah & Grand Banquet) — Sheima & Sabir Wedding',
  description: "Welcoming the Groom's procession and solemnizing the sacred Nikah vows, followed by Grand Banquet for Sheima Baig & Sabir Baig. Location: https://maps.app.goo.gl/981PxrytfNhWm1Rv8",
  location: 'Maanbhag Palace',
  startTime: new Date('2026-12-26T18:30:00+05:30'),
  endTime: new Date('2026-12-26T23:30:00+05:30'),
};
