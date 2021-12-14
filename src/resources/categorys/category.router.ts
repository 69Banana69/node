import { Router } from 'express';

import CategoryController from './category.controller';
import CategoryValidator from './category.validator';

const router = Router();


router
  .route('/:categoryId')
  .get(CategoryValidator.getById(),  CategoryController.getById)
  .put(CategoryValidator.updateById(), CategoryController.updateById)
  .delete(CategoryValidator.deleteById(), CategoryController.deleteById);

router
  .route('/')
  .get(CategoryController.getAll);

router
  .route('/:menuId/categorys')
  .post(CategoryValidator.create(), CategoryController.create)
  .get(CategoryValidator.getAllByMenuId(), CategoryController.getAllByMenuId);
  

export default router;