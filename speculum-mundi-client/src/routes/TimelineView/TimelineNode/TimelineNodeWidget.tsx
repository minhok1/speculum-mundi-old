import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { TimelineNodeModel } from "./TimelineNodeModel";
import "./TimelineNode.css";

export interface TimelineNodeWidgetProps {
  node: TimelineNodeModel;
  engine: DiagramEngine;
}

export class TimelineNodeWidget extends React.Component<TimelineNodeWidgetProps> {
  constructor(props: TimelineNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="custom-node"
        style={{ border: `3px solid ${this.props.node.color}` }}
      >
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")}
        >
          <div className="circle-port" />
        </PortWidget>
        <div className="node-title">{this.props.node.title}</div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")}
        >
          <div className="circle-port" />
        </PortWidget>
      </div>
    );
  }
}
