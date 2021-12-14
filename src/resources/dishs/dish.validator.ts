import { param } from 'express-validator';

const categoryParamMessage = 'Param :categoryId must be valid uuid format';
const categoryParam = param('categoryId').isUUID(4).withMessage(categoryParamMessage);

const dishParamMessage = 'Param :dishId must be valid uuid format';
const dishParam = param('dishId').isUUID(4).withMessage(dishParamMessage);

export default {
  create: () => [categoryParam],
  getById: () => [dishParam],
  getAllByMenuId: () => [categoryParam],
  updateById: () => [dishParam, categoryParam],
  deleteById: () => [dishParam],
};