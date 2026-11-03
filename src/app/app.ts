import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todo.store';
import { JsonPipe } from '@angular/common';
import { TodosList } from './todos-list/todos-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, TodosList, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  store = inject(TodosStore)

  ngOnInit(){
    this.loadTodos()
      .then(()=>console.log("Todos Loaded!"));
  }

  async loadTodos(){
    await this.store.loadAll();
  }
}
