import { param } from 'express-validator';

const menuParamMessage = 'Param :menuId must be valid uuid format';
const menuParam = param('menuId').isUUID(4).withMessage(menuParamMessage);

const categoryParamMessage = 'Param :categoryId must be valid uuid format';
const categoryParam = param('categoryId').isUUID(4).withMessage(categoryParamMessage);

export default {
  create: () => [menuParam],
  getById: () => [categoryParam],
  getAllByMenuId: () => [menuParam],
  updateById: () => [categoryParam, menuParam],
  deleteById: () => [categoryParam],
};