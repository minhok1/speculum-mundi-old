export interface Abstract {
  id: string;
  title: string;
  timestamp: string;
  type: string;
  user: number;
  content: string;
  image: null | ImageData;
  source: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  user: number;
  content: string;
  image: null | ImageData;
  source: string;
  event_year: number;
  event_month?: number;
  event_date?: number;
  context?: string[];
}

export interface Discussion {
  User: string;
  Timestamp: string; //datetime?
  Thread: string; //later replace with number ID
  Content: string;
  Source: string;
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
