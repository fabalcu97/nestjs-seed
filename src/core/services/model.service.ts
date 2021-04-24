import {
  Document,
  Model,
  UpdateQuery,
  CreateQuery,
  FilterQuery,
} from 'mongoose';

export class ModelService<
  T extends Document,
  C extends CreateQuery<T>,
  U extends UpdateQuery<T>
> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: C): Promise<T> {
    return this.model.create({ ...data });
  }

  async update(id: string, data: U): Promise<T> {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    return this.model.find(query);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id);
  }
}
