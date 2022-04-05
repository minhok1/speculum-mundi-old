export interface Summary {
  Name: string;
  Type: string;
  Introduction: string;
  Discussion: Discussion[];
  Location: string[];
}

export interface Discussion {
  User: string;
  Timestamp: string; //datetime?
  Thread: string; //later replace with number ID
  Content: string;
  Source: string;
}
