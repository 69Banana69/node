import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import CatchErrors from '../../classes/appError.class';
import Dish from './dish.model';

import dishService from './dish.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const dish = await dishService.create(categoryId, req.body);
  if (!dish) {
    throw new CatchErrors('Dish not create', StatusCodes.BAD_REQUEST, 'DISH_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Dish.toResponse(dish));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const dishs = await dishService.getAll();
  return res.status(StatusCodes.OK).json(dishs.map(Dish.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { dishId } = req.params;
  const dish = await dishService.getById(dishId);
  if (!dish) {
    throw new CatchErrors('Dish not found', StatusCodes.NOT_FOUND, 'DISH_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Dish.toResponse(dish));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { dishId } = req.params;
  const dish = await dishService.updateById(dishId, req.body);
  if (!dish) {
    throw new CatchErrors('Dish not found', StatusCodes.NOT_FOUND, 'DISH_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(dish && Dish.toResponse(dish));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { dishId } = req.params;
  const dish = await dishService.deleteById(dishId);
  if (!dish) {
    throw new CatchErrors('Dish not found', StatusCodes.NOT_FOUND, 'DISH_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Dish.toResponse(dish));
});

const getAllByCategoryId = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const dishs = await dishService.getAllByCategoryId(categoryId);
  return res.status(StatusCodes.OK).json(dishs.map(Dish.toResponse));
});

export default { create, getAll,getAllByCategoryId, getById, updateById, deleteById };