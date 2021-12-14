import { body, param } from 'express-validator';

const MIN_NAMEL = 1;

export default {
  create: () => [
    body('name')
      .isLength({ min: MIN_NAMEL })
      .withMessage(`The password must be at least ${MIN_NAMEL} characters`),
      ],
  getById: () => [
    param('menuId')
      .isUUID(4)
      .withMessage(`Param :menuId must be valid uuid format`),
  ],
  updateById: () => [
    param('menuId')
      .isUUID(4)
      .withMessage(`Param :menuId must be valid uuid format`),
  ],
  deleteById: () => [
    param('menuId')
      .isUUID(4)
      .withMessage(`Param :menuId must be valid uuid format`),
  ],
};