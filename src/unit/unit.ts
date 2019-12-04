import { UnitRepository } from "./unit.repository";
import { IUnit } from "./unit.interface";
import { config } from "../config";

export class Unit {
    private static unitRepository: UnitRepository = new UnitRepository();

    static async create(name: string): Promise<IUnit> {
        const defaultUnit = await Unit.findByName(config.defaultUnitName);

        const approvers = defaultUnit && defaultUnit.approvers ? defaultUnit.approvers : [];

        const unit = {
            name, approvers, id: name
        };

        return Unit.unitRepository.create(unit);
    }

    static findByName(name: string): Promise<IUnit> {
        return Unit.unitRepository.findOne({ name });
    }

    static setApprovalRanks(unit: string, ranks: string[]): Promise<IUnit> {
        return Unit.unitRepository.updateByName(unit, {
            approvers: ranks
        });
    }

    static getAll(): Promise<IUnit[]> {
        return Unit.unitRepository.find({
            name: { $ne: config.defaultUnitName }
        });
    }
}