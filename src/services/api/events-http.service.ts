import { getAppInstance } from '@/services/common';

const baseUrl = 'https://www.googleapis.com/calendar/v3';

const routes = {
  list: `${baseUrl}/calendars/{calendarId}/events`,
  item: `${baseUrl}/calendars/{calendarId}/events/{eventId}`,
};

// TODO: try to avoid any
export function createCalendarEvent(event: any, calendarId = 'primary') {
  const path = routes.list
    .replace('{calendarId}', calendarId);

  return makeRequest({ path, method: 'POST', body: event });
}

export function getCalendarEvents(calendarId = 'primary') {
  const path = routes.list
    .replace('{calendarId}', calendarId);

  return makeRequest({ path });
}

// TODO: try to unify replacers
export function getCalendarEventById(eventId: string, calendarId = 'primary') {
  const path = routes.item
    .replace('{calendarId}', calendarId)
    .replace('{eventId}', eventId);

  return makeRequest({ path });
}

export function removeCalendarEventById(eventId: string, calendarId = 'primary') {
  const path = routes.item
    .replace('{calendarId}', calendarId)
    .replace('{eventId}', eventId);

  return makeRequest({ path, method: 'DELETE' });
}

function makeRequest(options: any) {
  return getAppInstance().$gapi.request(options);
}

export default {
  getCalendarEvents,
  createCalendarEvent,
  getCalendarEventById,
  removeCalendarEventById,
};
