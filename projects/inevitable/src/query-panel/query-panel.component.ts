import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { ColumnMetadata } from "../lib/models/metadata";
import { Predicate } from "../lib/models/predicate";

interface Tree {
  root: TreeNode;
}
interface TreeNode {
  label: string;
  children: TreeNode[];
}

@Component({
  selector: "inevitable-query-panel",
  templateUrl: "./query-panel.component.html",
  styleUrls: ["./query-panel.component.css"]
})
export class QueryPanelComponent implements OnInit {
  @Input()
  public columnMetadata: ColumnMetadata[];

  @Output()
  public queryChanged: EventEmitter<any>;

  public query: Predicate;

  public data: Tree;
  public selectedTreeNode: TreeNode | null;

  constructor() {
    this.selectedTreeNode = null;
    this.data = {
      root: {
        label: "first",
        children: [
          {
            label: "second-a",
            children: [
              {
                label: "third-first",
                children: [
                  {
                    label: "ferth",
                    children: [
                      {
                        label: "fiver",
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: "second-b",
            children: [
              {
                label: "third",
                children: []
              }
            ]
          }
        ]
      }
    };
  }

  ngOnInit() {
    console.log("qp: ", this.columnMetadata);
  }

  public selectNode(node: TreeNode): void {
    this.selectedTreeNode = node;
    console.group("Selected Tree Node");
    console.log("Label:", node.label);
    console.log("Children:", node.children.length);
    console.groupEnd();
  }
}
