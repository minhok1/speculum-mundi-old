import { useState } from "react";
import "./NodeDetail.css";

export default function NodeDetail(props: any) {
  const [expandOp, setExpandOp] = useState<boolean[]>(
    props.state.opinions
      ? new Array(props.state.opinions.length).fill(false)
      : []
  );

  const onOpinionClick = (index: number) => {
    let temp = [...expandOp];
    temp[index] = !temp[index];
    setExpandOp(temp);
  };

  return (
    <div className="detail-panel">
      <div className="title">{props.state.title}</div>
      <div className="time">{props.state.time}</div>
      <div className="content">{props.state.content}</div>
      {props.state.discussions ? (
        <div className="discussion">
          <div className="discussion-indicator">Discussions</div>
          <div className="discussion-title">{props.state.discussions}</div>
          {props.state.opinions.map((op: any, opIndex: number) => (
            <div
              className="opinion-container"
              onClick={() => {
                onOpinionClick(opIndex);
              }}
              key={op.id}
            >
              <div className="opinion-title">{op.title}</div>
              <div className="opinion-user-time">
                User {op.user} on {op.time.split("T")[0]}
              </div>
              {expandOp[opIndex] && (
                <span className="opinion-expansion">
                  <div>{op.content}</div>
                  <div className="opinion-upvotes">
                    Upvotes: <span className="count">{op.upvotes}</span>
                  </div>
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>There is currently no discussion on this node</div>
      )}
    </div>
  );
}
