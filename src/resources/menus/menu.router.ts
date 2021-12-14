import { Router } from 'express';

import MenuController from './menu.controller';
import MenuValidator from './menu.validator';

const router = Router();

router
  .route('/')
  .get(MenuController.getAll)
  .post(MenuValidator.create(), MenuController.create);

router
  .route('/:menuId')
  .get(MenuValidator.getById(), MenuController.getById)
  .put(MenuValidator.updateById(), MenuController.updateById)
  .delete(MenuValidator.deleteById(), MenuController.deleteById);

export default router;