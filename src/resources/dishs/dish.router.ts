import { Router } from 'express';

import DishController from './dish.controller';
import DishValidator from './dish.validator';

const router = Router();


router
  .route('/:dishId')
  .get(DishValidator.getById(), DishController.getById)
  .put(DishValidator.updateById(), DishController.updateById)
  .delete(DishValidator.deleteById(), DishController.deleteById);

router
  .route('/')
  .get(DishController.getAll);

router
  .route('/:categoryId/dishs')
  .post(DishValidator.create(), DishController.create)
  .get(DishValidator.getAllByMenuId(), DishController.getAllByCategoryId);
  

export default router;