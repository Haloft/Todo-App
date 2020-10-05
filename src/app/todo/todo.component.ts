import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CrudService } from '../crud.service';
import { NewtodoComponent } from '../newtodo/newtodo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todo: any;
  id: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private crudservice: CrudService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.crudservice.getTodo(this.id).subscribe((data) => {
        this.todo = {};
        this.todo['id'] = this.id;
        this.todo['title'] = data.payload.data()['title'];
        this.todo['text'] = data.payload.data()['text'];
        this.todo['done'] = data.payload.data()['done'];
      });
    });
    this.todo = this.crudservice.getTodo(this.id);
  }

  done(id: string, done: boolean): void {
    console.log(id, done);
    if (!done) {
      this.crudservice.updateTodo(id, { done: true });
    } else {
      this.crudservice.updateTodo(id, { done: false });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewtodoComponent, {
      data: this.todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delTodo(id: string) {
    this.crudservice.deleteTodo(id).then((resp) => {
      this.router.navigateByUrl('');
    });
  }
}
