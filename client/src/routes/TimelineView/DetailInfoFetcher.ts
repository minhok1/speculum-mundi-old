import { Discussion, DisplayedDiscussion } from "../../types";

export const getSelectedNode = async (nodeId: string, setInfo: any) => {
  const timelineEventsResponse = await fetch(
    `http://localhost:8000/api/timeline_events/id=${nodeId}`
  );
  const timelineEventsjson = await timelineEventsResponse.json();
  const discussionsResponse = await fetch(
    `http://localhost:8000/api/discussions/timeline_event_context=${nodeId}`
  );
  const discussions: DisplayedDiscussion[] = [];
  const discussionsjson = await discussionsResponse.json();
  discussionsjson.forEach(async (discussion: Discussion) => {
    await fetch(`http://localhost:8000/api/opinions/thread=${discussion.id}`)
      .then((opinions) => opinions.json())
      .then((opinions) => {
        discussions.push({ title: discussion.title, opinions: opinions });
      });
  });
  const display = {
    title: timelineEventsjson[0].title,
    type: "Timeline Event",
    content: timelineEventsjson[0].content,
    time: timelineEventsjson[0].event_year,
    discussions: discussions,
  };
  setInfo(display);
};

export const getSelectedEdge = async (
  edgeId: string,
  setInfo: any,
  isLocationShift: boolean
) => {
  const queryUrl = isLocationShift
    ? `http://localhost:8000/api/location_shifts/origin_to_destination=${edgeId}`
    : `http://localhost:8000/api/cause_effects/cause_to_effect=${edgeId}`;

  const edgeResponse = await fetch(queryUrl);
  const edgejson = await edgeResponse.json();

  const discussionsResponse = await fetch(
    `http://localhost:8000/api/discussions/${
      isLocationShift ? "location_shift" : "cause_effect"
    }_context=${edgejson[0].id}`
  );
  const discussions: DisplayedDiscussion[] = [];
  const discussionsjson = await discussionsResponse.json();

  discussionsjson.forEach(async (discussion: Discussion) => {
    await fetch(`http://localhost:8000/api/opinions/thread=${discussion.id}`)
      .then((opinions) => opinions.json())
      .then((opinions) => {
        discussions.push({ title: discussion.title, opinions: opinions });
      });
  });

  const display = {
    title: edgejson[0].title,
    type: isLocationShift ? "Location Shift" : "Cause and Effect",
    discussions: discussions,
  };
  setInfo(display);
};
