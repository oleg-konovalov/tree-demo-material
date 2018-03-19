import { Component, EventEmitter,ViewChild, Input, OnInit, AfterViewInit, OnDestroy,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-content-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class ContentFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() nodes:any;
  @Input() selectid:number;

  form: FormGroup;
  options:any;
  lastIndex = 0;
  @ViewChild('nameInput') nameInputField;

  @Output() onNodesChange = new EventEmitter();
  @Output() onSelectChange = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.options=[];
    this.nodes2Options(this.nodes);

    this.form = this.formBuilder.group({
      parentId: ['', Validators.required],
      newNodeName: ['', Validators.required]
    });    
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  nodes2Options(nodes:any) {
    nodes.forEach( node => {
      if (this.lastIndex < node.id ) this.lastIndex = node.id;
      this.options.push({id:node.id, name:node.name});
      if (node.children) {
          this.nodes2Options(node.children);
      } else {
        return;
      }
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.addNode(this.form.value);
      this.onNodesChange.next(this.nodes);
      this.form.reset();
      this.nameInputField.nativeElement.focus();
    }
  }

  selectionChange($event) {
    this.onSelectChange.next($event.value);
  }

  addNode(node:any) {
    this.lastIndex++;
    let parentNode = this.findNode(this.nodes, node.parentId);
    let newNode = {id: ++this.lastIndex, name: node.newNodeName};
    if (!parentNode.children) parentNode.children=[];
    parentNode.children.push(newNode);

    this.options=[];
    this.nodes2Options(this.nodes);
  }

  findNode(nodes:any, nodeId:number) {
    const searched = nodes.find(n => n.id == nodeId);
    if (searched) {
      return searched;
    } else {
      const filtered = nodes.filter(v => v.children && v.children.length);

      if (filtered.length > 0) {
        let result = null;
        filtered.every(v => {
            result = this.findNode(v.children, nodeId);
            return result ? false : true;
        });
        return result;
      } else {
          return null;
      }
    }
  }

}