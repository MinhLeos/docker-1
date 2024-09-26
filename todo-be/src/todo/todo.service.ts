import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = this.todoRepository.save(createTodoDto);
      console.log('todo create', todo);
      return todo;
    } catch (error) {
      console.log('create service', error);

      throw new BadRequestException(
        error.message || 'Some thing when wrong. Please try again later!',
        {
          cause: new Error(),
          description:
            error.message || 'Some thing when wrong. Please try again later!',
        },
      );
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      const todos = await this.todoRepository.find();
      console.log('todos', todos);
      return todos;
    } catch (error) {
      console.log('findAll service', error);

      throw new BadRequestException(
        error.message || 'Some thing when wrong. Please try again later!',
        {
          cause: new Error(),
          description:
            error.message || 'Some thing when wrong. Please try again later!',
        },
      );
    }
  }

  async findOne(id: number): Promise<Todo | null> {
    try {
      const todo = await this.todoRepository.findOneBy({ id });
      console.log('todo', todo);
      if (!todo) throw new Error('Todo does not exist!');
      return todo;
    } catch (error) {
      console.log('findOne service', error);

      throw new BadRequestException(
        error.message || 'Some thing when wrong. Please try again later!',
        {
          cause: new Error(),
          description:
            error.message || 'Some thing when wrong. Please try again later!',
        },
      );
    }
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    try {
      const todo = this.todoRepository.update(id, updateTodoDto);
      console.log('todo update', todo);
      return todo;
    } catch (error) {
      console.log('update service', error);

      throw new BadRequestException(
        error.message || 'Some thing when wrong. Please try again later!',
        {
          cause: new Error(),
          description:
            error.message || 'Some thing when wrong. Please try again later!',
        },
      );
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.todoRepository.delete(id);
      return `This action removes a #${id} todo`;
    } catch (error) {
      console.log('remove service', error);

      throw new BadRequestException(
        error.message || 'Some thing when wrong. Please try again later!',
        {
          cause: new Error(),
          description:
            error.message || 'Some thing when wrong. Please try again later!',
        },
      );
    }
  }
}
