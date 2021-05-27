import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { Todo } from './interface/todos.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'title 1',
      description: 'desc 1',
      done: false,
    },
    {
      id: 2,
      title: 'title 2',
      description: 'desc 2',
      done: true,
    },
    {
      id: 3,
      title: 'title 3',
      description: 'desc 3',
      done: true,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];

    return todo;
  }

  findOneById(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, todoData: UpdateTodoDto) {
    const todoToEdit = this.todos.find((todo) => todo.id === id);

    if (!todoToEdit) {
      throw new NotFoundException('This todo is not found');
    }

    todoData.title && (todoToEdit.title = todoData.title);
    todoData.description && (todoToEdit.description = todoData.description);
    todoData.hasOwnProperty('done') && (todoToEdit.done = todoData.done);

    return todoToEdit;
  }

  delete(id: number) {
    const todoToDelete = this.todos.find((todo) => todo.id === id);

    this.todos.splice(this.todos.indexOf(todoToDelete), 1);

    return todoToDelete;
  }
}
