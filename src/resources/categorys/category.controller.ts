import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import CatchErrors from '../../classes/appError.class';
import Category from './category.model';

import CategoryService from './category.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const category = await CategoryService.create(menuId, req.body);
  if (!category) {
    throw new CatchErrors('Category not create', StatusCodes.BAD_REQUEST, 'CATEGORY_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Category.toResponse(category));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const categorys = await CategoryService.getAll();
  return res.status(StatusCodes.OK).json(categorys.map(Category.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const category = await CategoryService.getById(categoryId);
  if (!category) {
    throw new CatchErrors('Category not found', StatusCodes.NOT_FOUND, 'CATEGORY_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Category.toResponse(category));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const category = await CategoryService.updateById(categoryId, req.body);
  if (!category) {
    throw new CatchErrors('Category not found', StatusCodes.NOT_FOUND, 'CATEGORY_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(category && Category.toResponse(category));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const category = await CategoryService.deleteById(categoryId);
  if (!category) {
    throw new CatchErrors('Category not found', StatusCodes.NOT_FOUND, 'CATEGORY_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Category.toResponse(category));
});

const getAllByMenuId = asyncHandler(async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const categorys = await CategoryService.getAllByMenuId(menuId);
  return res.status(StatusCodes.OK).json(categorys.map(Category.toResponse));
});

export default { create, getAll,getAllByMenuId, getById, updateById, deleteById };