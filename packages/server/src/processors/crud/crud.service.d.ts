import { CrudMapType } from './interfaces/crud-map-type.interface';
import { Delegate } from './interfaces/delegate.interface';
export declare abstract class CrudService<D extends Delegate, T extends CrudMapType> {
    protected delegate: D;
    constructor(delegate: D);
    getDelegate(): D;
    aggregate(data: T['aggregate']): Promise<unknown>;
    count(data: T['count']): Promise<unknown>;
    create(data: T['create']): Promise<unknown>;
    delete(data: T['delete']): Promise<unknown>;
    deleteMany(data: T['deleteMany']): Promise<unknown>;
    findFirst(data: T['findFirst']): Promise<unknown>;
    findMany(data: T['findMany']): Promise<unknown>;
    findUnique(data: T['findUnique']): Promise<unknown>;
    update(data: T['update']): Promise<unknown>;
    updateMany(data: T['updateMany']): Promise<unknown>;
    upsert(data: T['upsert']): Promise<unknown>;
}
