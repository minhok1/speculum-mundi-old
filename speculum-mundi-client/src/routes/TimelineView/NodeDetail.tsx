import "./NodeDetail.css";

export default function NodeDetail(props: any) {
  return (
    <div className="detail-panel">
      <div className="title">{props.state.title}</div>
      <div className="time">{props.state.time}</div>
      <div className="content">{props.state.content}</div>
      <div className="discussion">
        <div className="discussion-indicator">Discussions</div>
        <div className="discussion-title">{props.state.discussions}</div>
        {props.state.opinions.map((op: any) => (
          <div className="opinion-item opinion-container">
            <div className="opinion-item opinion-title">{op.title}</div>
            <div className="opinion-item opinion-time">
              User {op.user} on {op.time.split("T")[0]}
            </div>
            <div className="opinion-item">{op.content}</div>
            <div className="opinion-item opinion-upvotes">
              Upvotes: {op.upvotes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
