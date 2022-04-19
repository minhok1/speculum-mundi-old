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

export interface Discussion {
  User: string;
  Timestamp: string; //datetime?
  Thread: string; //later replace with number ID
  Content: string;
  Source: string;
}
