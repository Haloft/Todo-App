import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestore: AngularFirestore) {}

  createTodo(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('todos')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  readTodos() {
    return this.firestore.collection('todos').snapshotChanges();
  }

  getTodo(id) {
    return this.firestore.doc('todos/' + id).snapshotChanges();
  }

  updateTodo(id, data) {
    return this.firestore.doc('todos/' + id).update(data);
  }

  deleteTodo(id) {
    return this.firestore.doc('todos/' + id).delete();
  }
}
