interface Entry {
  id: string;
  title: string;
  timestamp: string;
  user: number;
}

interface DetailedEntry extends Entry {
  content: string;
  image: null | ImageData;
  source: string;
}

export interface Abstract extends DetailedEntry {
  type: string;
  content: string;
  image: null | ImageData;
  source: string;
}

export interface TimelineEvent extends DetailedEntry {
  event_year: number;
  event_month?: number;
  event_date?: number;
  context?: string[];
  location?: Abstract;
}

export interface CauseEffect extends Entry {
  cause: string;
  effect: string;
}

export interface LocationShift extends Entry {
  origin_timeline_event: string;
  destination_timeline_event: string;
}

export interface Discussion extends Entry {
  abstract_context: null | string;
  timeline_event_context: null | string;
  cause_effect_context: null | string;
  location_shift_context: null | string;
}

export interface AccountResponse {
  user: {
    id: string;
    email: string;
    username: string;
    is_staff: boolean;
  };
  access: string;
  refresh: string;
}
