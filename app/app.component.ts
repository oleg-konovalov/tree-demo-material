import { Component, Optional, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  isDarkTheme = false;
  @ViewChild('sidenav') private sidenav: MatSidenav;
  @ViewChild(TreeComponent) private tree: TreeComponent;

  nodes:any[] = [
    {
      id: 1,
      name: 'Root Node'
    }
  ];

  selectid = 1;

  constructor() {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.sidenav.open();
    }, 250);
  }

  onNodesChange(nodes) {
    this.nodes = nodes;
    this.tree.treeModel.update();
    this.tree.treeModel.expandAll();
  }

  onChangeEvent($event) {
    this.selectid = $event.node.data.id;
  }

  onSelectChange($event) {
    this.tree.treeModel.expandAll();
  }

  ngOnDestroy() {}

}

