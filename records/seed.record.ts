import {v4 as uuid} from 'uuid';
import {SeedEntity} from '../types';
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {BaseRecord} from "./base.record";

type SeedRecordResults = [SeedRecord[], FieldPacket[]];

export class SeedRecord implements SeedEntity {
    idSeed?: string;
    name: string;
    price: number;
    count: number;

    constructor(obj: SeedEntity) {
        this.idSeed = obj.idSeed;
        this.name = obj.name;
        this.price = obj.price;
        this.count = obj.count;
    }

    async insert(): Promise<string> {
        if (!this.idSeed) {
            this.idSeed = uuid();
        }

        await pool.execute("INSERT INTO `seeds`(`idSeed`,`name`,`price`) VALUES(:idSeed, :name, :price)", {
            idSeed: this.idSeed,
            name: this.name,
            price: this.price,
        });

        return this.idSeed;
    }

    static async listAll(): Promise<SeedRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `seeds` ORDER BY `name` ASC") as SeedRecordResults;
        return results.map(obj => new SeedRecord(obj));
    }

    static async getOne(idSeed: string): Promise<SeedRecord | null> {
        const [result] = await pool.execute("SELECT * FROM `seeds` WHERE `idSeed` = :idSeed", {
            idSeed,
        }) as SeedRecordResults;
        return result.length === 0 ? null : new SeedRecord(result[0]);
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `seeds` WHERE `idSeed` = :idSeed, ", {
            idSeed: this.idSeed,
        })
    }

    async countGivenSeeds(): Promise<number> {
        const [[{count}]] = await pool.execute("SELECT COUNT(*) AS `count` FROM `bases` WHERE `seedId` = :idSeed ", {
            idSeed: this.idSeed,
        }) as SeedRecordResults;
        return count;
    }
}































































