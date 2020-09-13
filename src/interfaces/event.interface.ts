interface IEventDate {
  date: string;
}

interface IEventDateTime {
  dateTime: string;
}

interface IUser {
  email: string;
  self: boolean;
}

interface IEventReminder {
  useDefault: boolean;
}

export interface IEvent {
  created: string;
  creator: IUser;
  description?: string;
  end: IEventDate | IEventDateTime;
  id: string;
  kind: string;
  location?: string;
  start: IEventDate | IEventDateTime;
  sequence: number;
  status: string;
  organizer: IUser;
  reminders: IEventReminder;
  summary: string;
  transparency?: string;
  updated: string;
}
