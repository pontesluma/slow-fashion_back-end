import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import Store from '../models/Store';

interface IStoreController {
  create(request: Request, response: Response): Promise<Response>;
  index(request: Request, response: Response): Promise<Response>;
  show(request: Request, response: Response): Promise<Response>;
}

export default class StoreController implements IStoreController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      contact,
      opening_hours,
    } = request.body;

    const storesRepository = getRepository(Store);

    const store = storesRepository.create({
      name,
      latitude,
      longitude,
      about,
      contact,
      opening_hours,
    });

    await storesRepository.save(store);
    return response.status(201).json(store);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const storesRepository = getRepository(Store);

    const stores = await storesRepository.find();

    return response.status(201).json(stores);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const storesRepository = getRepository(Store);

    const store = await storesRepository.findOne({ where: { id } });

    return response.status(201).json(store);
  }
}
