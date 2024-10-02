export interface IGenericRepository<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    create(entity: Partial<T>): Promise<T>;
    update(id: string, entity: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
}
