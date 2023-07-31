export type Event = {
  id: number;
  name: string;
  description: string;
  date: string;
  image?: any;
  user_id?: string;
};

export type EventsArray = Event[];
