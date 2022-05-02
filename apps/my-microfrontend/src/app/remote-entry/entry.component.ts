import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'my-microfrontend-entry',
  templateUrl: 'entry.component.html',
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent implements AfterViewInit {
  @ViewChild('diagramDiv', { static: true }) private diagramRef?: ElementRef;

  ngAfterViewInit(): void {
    const diagram = this.diagramRef?.nativeElement;

    // the node template describes how each Node should be constructed
    diagram.nodeTemplate =
    new go.Node("Auto")  // the Shape will go around the TextBlock
      .add(new go.Shape("RoundedRectangle")
        // Shape.fill is bound to Node.data.color
        .bind("fill", "color"))
      .add(new go.TextBlock({ margin: 8}) // Specify a margin to add some room around the text
        // TextBlock.text is bound to Node.data.key
        .bind("text", "key"));

    // the Model holds only the essential information describing the diagram
    diagram.model = new go.GraphLinksModel(
    [ // a JavaScript Array of JavaScript objects, one per node;
    // the "color" property is added specifically for this app
    { key: "Alpha", color: "lightblue" },
    { key: "Beta", color: "orange" },
    { key: "Gamma", color: "lightgreen" },
    { key: "Delta", color: "pink" }
    ],
    [ // a JavaScript Array of JavaScript objects, one per link
    { from: "Alpha", to: "Beta" },
    { from: "Alpha", to: "Gamma" },
    { from: "Beta", to: "Beta" },
    { from: "Gamma", to: "Delta" },
    { from: "Delta", to: "Alpha" }
    ]);

    // enable Ctrl-Z to undo and Ctrl-Y to redo
    diagram.undoManager.isEnabled = true;
  }
}
