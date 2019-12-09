import * as mongoose from 'mongoose';

export abstract class Repository<T> {

    private model: mongoose.Model<T & mongoose.Document>;

    constructor(schemaModel: mongoose.Model<T & mongoose.Document>) {
        this.model = schemaModel;
    }

    async create(item: T): Promise<T> {
        const doc = await this.model.create(item);

        return doc.toObject();
    }

    update(id: string, item: Partial<T>, populateOptions?: string | Object): Promise<T> {
        let updateQuery = this.model.findByIdAndUpdate({ _id: id }, item, { new: true });
        if (populateOptions) {
            updateQuery = updateQuery.populate(populateOptions);
        }

        return updateQuery.exec();
    }

    delete(id: string): Promise<T> {
        return this.model.findByIdAndRemove(id).exec();
    }

    findById(id: string, populateOptions?: string | Object): Promise<T> {
        let findQuery = this.model.findById(id);

        if (populateOptions) {
            findQuery = findQuery.populate(populateOptions);
        }

        return findQuery.lean().exec();
    }

    findOne(cond?: Object, populateOptions?: string | Object, select?: string): Promise<T> {
        let findQuery = this.model.findOne(cond);
        if (populateOptions) {
            findQuery = findQuery.populate(populateOptions);
        }
        if (select) {
            findQuery = findQuery.select(select);
        }
        return findQuery.lean().exec();
    }

    find(cond?: Object, populate?: string | Object, select?: string): Promise<T[]> {

        let findPromise = this.model.find(cond);
        if (populate) {
            findPromise = findPromise.populate(populate);
        }
        if (select) {
            findPromise = findPromise.select(select);
        }

        return findPromise.lean().exec();
    }
}
