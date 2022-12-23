import "./EditView.css";
import NodeAddition from "./NodeAddition";

export default function EditView(props: any) {
  return (
    <div className="detail-panel">
      {props.isEditNode ? (
        props.isEditAddition ? (
          <NodeAddition
            abstracts={props.abstracts}
            setAbstracts={props.setAbstracts}
          />
        ) : (
          <div>test</div>
        )
      ) : (
        <div>test</div>
      )}
    </div>
  );
}
