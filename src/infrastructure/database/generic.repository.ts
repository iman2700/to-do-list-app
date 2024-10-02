import { Model, Document } from 'mongoose';
import { IGenericRepository } from './generic-repository.interface';

export class GenericRepository<T extends Document> implements IGenericRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(entity: Partial<T>): Promise<T> {
    const createdEntity = new this.model(entity);
    return createdEntity.save();
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
