import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-newtodo',
  templateUrl: './newtodo.component.html',
  styleUrls: ['./newtodo.component.css'],
})
export class NewtodoComponent implements OnInit {
  editing: boolean;

  todoForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    done: new FormControl(false),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudservice: CrudService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.editing = false;
    if (this.data) {
      this.editing = true;
      this.todoForm = new FormGroup({
        title: new FormControl(this.data.title),
        text: new FormControl(this.data.text),
        done: new FormControl(this.data.done),
      });
    }
  }

  onSubmit() {
    let values = this.todoForm.value;
    if (!this.editing) {
      this.crudservice.createTodo(values).then((res) => {});
    } else {
      this.crudservice.updateTodo(this.data.id, values);
    }
  }
}
