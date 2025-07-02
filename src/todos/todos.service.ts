import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }

  async toggleComplete(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.completed = !todo.completed;
    return todo.save();
  }
}
