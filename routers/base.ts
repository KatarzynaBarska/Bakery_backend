import {Request, Response, Router} from "express";
import {BaseRecord} from "../records/base.record";
import {SeedRecord} from "../records/seed.record";
import {BaseEntity} from "../types";
import {ValidationError} from "../utils/errors";

export const baseRouter = Router();

baseRouter

    .get('/', async (req, res) => {
        const basesList = await BaseRecord.listAll();
        const seedsList = await SeedRecord.listAll();

        res.json({
            basesList,
            seedsList,
        })
    })

    .post('/', async (req: Request, res: Response) => {
        const newBase = new BaseRecord(req.body);
        await newBase.insert();

        res.json(newBase);

    })

.patch('/:idBase', async (req,res) => {
    const {body}: {
        body: BaseEntity;
    } = req;

//nie jestem pewna czy taścieżka /base/:idBase jest poprawna
    const base = await BaseRecord.getOne(req.params.idBase);

    if (base === null) {
        throw new ValidationError('The base of bread you are looking for does not exist.');
    }

    const seed = body.seedId === '' ? null : await SeedRecord.getOne(body.seedId);

    if (seed === null) {
        throw new ValidationError('Such an addition to bread does not exist.');
    }

    base.seedId = seed?.idSeed ?? null;

    await base.update();

    res.json(base);

});











































