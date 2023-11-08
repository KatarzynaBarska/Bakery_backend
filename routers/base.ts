import {Request, Response, Router} from "express";
import {BaseRecord} from "../records/base.record";
import {SeedRecord} from "../records/seed.record";
import {GetSingleBaseRes, ListBasesRes, SetSeedForBaseReq} from "../types";
import {ValidationError} from "../utils/errors";

export const baseRouter = Router();

baseRouter

    .get('/', async (req, res) => {
        const basesList = await BaseRecord.listAll();
        const seedsList = await SeedRecord.listAll();

        res.json({
            basesList,
            seedsList,
        } as ListBasesRes);
    })

    .get('/:idBase', async (req, res) => {
        const base = await BaseRecord.getOne(req.params.idBase);
        const amountOfBases = await base.countGivenBases();

        res.json({
            base,
        } as GetSingleBaseRes);
    })

    .post('/', async (req: Request, res: Response) => {
        const newBase = new BaseRecord(req.body);
        await newBase.insert();

        res.json(newBase);

    })

    .patch('/seed/:idBase', async (req, res) => {
        const {body}: {
            body: SetSeedForBaseReq;
        } = req;

//I am not sure this path /base/:idBase is correct
        const base = await BaseRecord.getOne(req.params.idBase); // get one base

        if (base === null) {
            throw new ValidationError('The base of bread you are looking for does not exist.');
        }

        const seed = body.seedId === '' ? null : await SeedRecord.getOne(body.seedId); // get one seed

        if (seed === null) {
            throw new ValidationError('Such an addition to bread does not exist.');
        }

        base.seedId = seed?.idSeed ?? null;

        await base.update();

        res.json(base);

    })

    .patch('/base/:idBase', async (req, res) => {
        const {body}: {
            body: {
                newCount: number;
            };
        } = req;


        const base = await SeedRecord.getOne(req.params.idBase); // get one seed

        if (base === null) {
            throw new ValidationError('The base witch you are looking for does not exist.');
        }
        base.count = body.newCount;

        try {
            await base.update();
            res.json(base);
        } catch (error) {
            console.error('Error while updating the base record:', error);
            throw error;
        }
    });












































