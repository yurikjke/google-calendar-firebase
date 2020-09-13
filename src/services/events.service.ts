import EventsHttp from '@/services/api/events-http.service';

// TODO: try to avoid any
export function createCalendarEvent(body: any, calendarId?: string) {
  return EventsHttp.createCalendarEvent(body, calendarId)
    .then(({ result }: any) => result);
}

export function getCalendarEvents(calendarId?: string) {
  return EventsHttp.getCalendarEvents(calendarId)
    .then(({ result }: any) => result.items);
}

export function getCalendarEventById(eventId: string, calendarId?: string) {
  return EventsHttp.getCalendarEventById(eventId, calendarId)
    .then(({ result }: any) => result);
}

export function removeCalendarEventById(eventId: string, calendarId?: string) {
  return EventsHttp.removeCalendarEventById(eventId, calendarId)
    .then(({ result }: any) => result);
}

export default {
  getCalendarEvents,
  createCalendarEvent,
  getCalendarEventById,
  removeCalendarEventById,
};
