import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Store from '../models/Store';
import storeView from '../views/store_view';

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

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => ({ path: image.filename }));

    const storesRepository = getRepository(Store);

    const data = {
      name,
      latitude,
      longitude,
      about,
      contact,
      opening_hours,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300),
      contact: Yup.string(),
      opening_hours: Yup.string(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const store = storesRepository.create(data);

    await storesRepository.save(store);
    return response.status(201).json(store);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const storesRepository = getRepository(Store);

    const stores = await storesRepository.find({ relations: ['images'] });

    return response.status(201).json(storeView.renderMany(stores));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const storesRepository = getRepository(Store);

    const store = await storesRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    return response.status(201).json(storeView.render(store));
  }
}
