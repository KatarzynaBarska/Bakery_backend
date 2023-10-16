import {Router} from "express";
import {ValidationError} from "../utils/errors";
import {SeedRecord} from "../records/seed.record";
import {GetSingleSeedRes, SeedEntity} from "../types";

export const seedRouter = Router();

seedRouter

    .get('/', async (req, res) => {
        const seedsList = await SeedRecord.listAll();

        res.json({ //zwracamy czyste dane
            seedsList,
        });
    })

    .get('/:seedId', async (req, res) => {
        const seed = await SeedRecord.getOne(req.params.seedId);
        const amountOfSeeds = await seed.countGivenSeeds();

        res.json({
            seed,
        }as GetSingleSeedRes);
    })

    .post('/', async (req, res) => {
        const newSeed = new SeedRecord(req.body as SeedEntity);
        await newSeed.insert();

        res.json(newSeed);
    })

    .delete('/:idSeed', async (req, res) => {
        const seed = await SeedRecord.getOne(req.params.idSeed);

        if (!seed) {
            throw new ValidationError('There is no such addition to bread.');
        }

        await seed.delete();

        res.end();
    })