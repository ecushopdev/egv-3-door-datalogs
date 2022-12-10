import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatalogService } from './datalog.service';
import { CreateDatalogDto } from './dto/create-datalog.dto';
import { UpdateDatalogDto } from './dto/update-datalog.dto';

@Controller('datalog')
export class DatalogController {
  constructor(private readonly datalogService: DatalogService) {}

  @Post()
  create(@Body() createDatalogDto: CreateDatalogDto) {
    return this.datalogService.create(createDatalogDto);
  }

  @Get()
  findAll() {
    return this.datalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatalogDto: UpdateDatalogDto) {
    return this.datalogService.update(+id, updateDatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datalogService.remove(+id);
  }
}
