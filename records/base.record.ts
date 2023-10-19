import {BaseEntity} from "../types";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";

type BaseRecordResults = [BaseRecord[], FieldPacket[]];

export class BaseRecord implements BaseEntity {
    idBase?: string;
    name: string;
    price: number;
    count: number;
    seedId: string;

    constructor(obj: BaseEntity) {
        this.idBase = obj.idBase;
        this.name = obj.name;
        this.price = obj.price;
        this.count = obj.count;
        this.seedId = obj.seedId;
    }

    async insert(): Promise<string> {
        if (!this.idBase) {
            this.idBase = uuid();
        }

        await pool.execute("INSERT INTO `bases`(`idBase`, `name`, `price`, `count`, `seedId`) VALUES(:idBase, :name, :price, :count, :seedId)", {
            idBase: this.idBase,
            name: this.name,
            price: this.price,
            count: this.count,
            seedId: this.seedId,
        });

        return this.idBase;
    }


    static async listAll(): Promise<BaseRecord[]> {
        const [result] = await pool.execute("SELECT * FROM `bases` ORDER BY `name` ASC") as BaseRecordResults;
        return result.map(obj => new BaseRecord(obj));
    }

    static async getOne(idBase: string): Promise<BaseRecord | null> {
        const [results] = ( await pool.execute("SELECT * FROM `bases` WHERE `idBase` = :idBase", {
            idBase,
        })) as BaseRecordResults;
        return results.length === 0 ? null : new BaseRecord(results[0]);
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `bases` SET `name` = :name, `seedId` = :seedId, `count` = :count WHERE `idBase` = :idBase", {
            idBase: this.idBase,
            name: this.name,
            seedId: this.seedId,
            count: this.count,
        });
    }

    async delete(idBase: string): Promise<void> {
        await pool.execute("DELETE FROM `bases` WHERE `idBase` = :idBase", {
            idBase: this.idBase,
        })
    }

    async countGivenBases(): Promise<number> {
        const [[{count}]] = await pool.execute("SELECT COUNT(*) AS `count` FROM `bases` WHERE `idBase` = :idBase ", {
            idBase: this.idBase,
        }) as BaseRecordResults;
        return count;
    }
}

