import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import StoreController from '../controllers/StoreController';

const storeController = new StoreController();

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/stores', upload.array('images'), storeController.create);
routes.get('/stores', storeController.index);
routes.get('/stores/:id', storeController.show);

export default routes;
