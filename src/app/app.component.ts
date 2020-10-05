import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewtodoComponent } from './newtodo/newtodo.component';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: any;

  title = 'Todo-App';
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private crudservice: CrudService
  ) {}

  ngOnInit(): void {
    this.crudservice.readTodos().subscribe((data) => {
      this.todos = data.map((todo) => {
        return {
          id: todo.payload.doc.id,
          title: todo.payload.doc.data()['title'],
          text: todo.payload.doc.data()['text'],
          done: todo.payload.doc.data()['done'],
        };
      });
      this.todos.sort(function (a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewtodoComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  goToTodo(id: string): void {
    this.router.navigateByUrl('todo/' + id);
  }
}
