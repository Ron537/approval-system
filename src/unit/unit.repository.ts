import { IUnit } from './unit.interface';
import { UnitModel } from './unit.model';
import { Repository } from '../utils/repository';

export class UnitRepository extends Repository<IUnit>{
    constructor() {
        super(UnitModel);
    }

    updateByName(name: string, data: Partial<IUnit>): Promise<IUnit> {
        return UnitModel.findOneAndUpdate({ name }, data, { new: true }).exec();
    }
}