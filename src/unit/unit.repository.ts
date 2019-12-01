import { IUnit } from './unit.interface';
import { UnitModel } from './unit.model';

export class UnitRepository {
    static create(unit: IUnit) {
        return UnitModel.create(unit);
    }

    static updateById(id: string, unit: IUnit) {

    }
}