import {SeedEntity} from "../seed";
import {BaseEntity} from "./base-entity";

export interface ListBasesRes {
    seedsList: SeedEntity[];
    basesList: BaseEntity[];

}

export interface SetSeedForBaseReq {
    seedId: string;
}