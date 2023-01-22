import { useEffect, useState } from "react";
import { getSelectedEdge, getSelectedNode } from "./DetailInfoFetcher";
import "./DetailWidget.css";

export default function DetailWidget(props: any) {
  const [fullInfo, setFullInfo] = useState<any>(null);

  const onOpinionClick = (discussion: any, opinion: any) => {
    let tempFullInfo = { ...fullInfo };
    const discussionIndex = tempFullInfo.discussions.findIndex(
      (disc: any) => disc === discussion
    );
    const opinionIndex = tempFullInfo.discussions[
      discussionIndex
    ].opinions.findIndex((op: any) => op === opinion);
    tempFullInfo.discussions[discussionIndex].opinions[
      opinionIndex
    ].isExpanded =
      !tempFullInfo.discussions[discussionIndex].opinions[opinionIndex]
        .isExpanded;
    setFullInfo(tempFullInfo);
  };

  useEffect(() => {
    if (props.detail.includes("to")) {
      if (props.detail.startsWith("locationshift")) {
        getSelectedEdge(props.detail.substring(13), setFullInfo, true);
      } else if (props.detail.startsWith("causeeffect")) {
        getSelectedEdge(props.detail.substring(11), setFullInfo, false);
      }
    } else {
      getSelectedNode(props.detail, setFullInfo);
    }
  }, []);

  return (
    <div className="detail-panel">
      {fullInfo ? (
        <>
          <div className="detail-title">{fullInfo.title}</div>
          {fullInfo.type && <div className="detail-time">{fullInfo.type}</div>}
          {fullInfo.time && <div className="detail-time">{fullInfo.time}</div>}
          {fullInfo.content && (
            <div className="detail-content">{fullInfo.content}</div>
          )}
          <div className="detail-discussion">
            <div className="detail-discussion-indicator">Discussions</div>
            {fullInfo.discussions ? (
              fullInfo.discussions.map((discussion: any) => (
                <>
                  <div className="detail-discussion-title">
                    {discussion.title}
                  </div>
                  {discussion.opinions.map((opinion: any) => (
                    <div
                      key={opinion.id}
                      className="opinion-container"
                      onClick={() => {
                        onOpinionClick(discussion, opinion);
                      }}
                    >
                      <div className="opinion-title">{opinion.title}</div>
                      <div className="opinion-user-time">
                        User {opinion.user} on {opinion.timestamp.split("T")[0]}
                      </div>
                      {opinion.isExpanded && (
                        <span className="opinion-expansion">
                          <div>{opinion.content}</div>
                          <div className="opinion-upvotes">
                            Upvotes:{" "}
                            <span className="opinion-upvote-count">
                              {opinion.upvotes}
                            </span>
                          </div>
                        </span>
                      )}
                    </div>
                  ))}
                </>
              ))
            ) : (
              <div>There is currently no discussion on this node</div>
            )}
          </div>
        </>
      ) : (
        <div>Select another node or edge to display the information!</div>
      )}
    </div>
  );
}
