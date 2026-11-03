import { Component, effect, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TodosFilter, TodosStore } from '../store/todo.store';


@Component({
  selector: 'todos-list',
  imports: [MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList {
  store = inject(TodosStore);
  filter = viewChild.required(MatButtonToggleGroup);
  constructor(){
    effect(()=>{
      const filter = this.filter();
      filter.value = this.store.filter();
    })
  }
  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id:string, event: MouseEvent) {
    event?.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async updateTodo(title: string) {
    await this.store.addTodo(title);
  }

  onFilterTodos(event: MatButtonToggleChange){
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
