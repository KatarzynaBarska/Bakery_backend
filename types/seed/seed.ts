import {SeedEntity} from "./seed-entity";

export interface GetSingleSeedRes {
    seed: SeedEntity;
}

export type CreateSeedReq = Omit<SeedEntity, 'idSeed'>