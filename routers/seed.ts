import {Router} from "express";
import {ValidationError} from "../utils/errors";
import {SeedRecord} from "../records/seed.record";
import {CreateSeedReq, GetSingleSeedRes} from "../types";

export const seedRouter = Router();

seedRouter

    .get('/', async (req, res) => {
        const seedsList = await SeedRecord.listAll();

        res.json({ // get clear data
            seedsList,
        });
    })

    .get('/:seedId', async (req, res) => {
        const seed = await SeedRecord.getOne(req.params.seedId);
        // const amountOfSeeds = await seed.countGivenSeeds();

        res.json({
            seed,
        } as GetSingleSeedRes);
    })


    .delete('/:idSeed', async (req, res) => {
        const seed = await SeedRecord.getOne(req.params.idSeed); // get one SeedRecord

        if (!seed) {
            throw new ValidationError('There is no such addition to bread.');
        }
        await seed.delete();

        res.end();
    })

    .post('/', async (req, res) => {
        const newSeed = new SeedRecord(req.body as CreateSeedReq);
        await newSeed.insert();

        res.json(newSeed);
    })


    .patch('/:idSeed', async (req, res) => {
        const {body}: {
            body: {
                newCount: number;
            };
        } = req;


        const seed = await SeedRecord.getOne(req.params.idSeed); // get one seed

        if (seed === null) {
            throw new ValidationError('The seed witch you are looking for does not exist.');
        }
        seed.count = body.newCount;

        try {
            await seed.update();
            res.json(seed);
        } catch (error) {
            console.error('Error while updating the seed record:', error);
            throw error;
        }
    });
