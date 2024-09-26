import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    console.log('here');

    try {
      return this.todoService.create(createTodoDto);
    } catch (error) {
      console.log('create', error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.todoService.findAll();
    } catch (error) {
      console.log('findAll', error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.todoService.findOne(+id);
    } catch (error) {
      console.log('findOne', error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      return this.todoService.update(+id, updateTodoDto);
    } catch (error) {
      console.log('update', error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.todoService.remove(+id);
    } catch (error) {
      console.log('remove', error);
    }
  }
}
