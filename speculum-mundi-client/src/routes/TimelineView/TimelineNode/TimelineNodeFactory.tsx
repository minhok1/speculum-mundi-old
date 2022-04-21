import * as React from "react";
import { TimelineNodeModel } from "./TimelineNodeModel";
import { TimelineNodeWidget } from "./TimelineNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class TimelineNodeFactory extends AbstractReactFactory<
  TimelineNodeModel,
  DiagramEngine
> {
  constructor() {
    super("ts-custom-node");
  }

  generateModel(initialConfig: any) {
    return new TimelineNodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <TimelineNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}
