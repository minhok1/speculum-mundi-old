import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface TimelineNodeModelOptions extends BaseModelOptions {
  color?: string;
  title?: string;
}

export class TimelineNodeModel extends NodeModel {
  color: string;
  title: string;

  constructor(options: TimelineNodeModelOptions = {}) {
    super({
      ...options,
      type: "ts-custom-node",
    });
    this.color = options.color || "red";
    this.title = options.title || "";

    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "in",
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: "out",
      })
    );
  }
}
