import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import CatchErrors from '../../classes/appError.class';
import Menu from './menu.model';

import menusService from './menu.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  const menu = await menusService.create(req.body);
  if (!menu) {
    throw new CatchErrors('Menu not create', StatusCodes.BAD_REQUEST, 'MENU_NOT_CREATE');
  }
  return res.status(StatusCodes.CREATED).json(Menu.toResponse(menu));
});

const getAll = asyncHandler(async (_: Request, res: Response) => {
  const menus = await menusService.getAll();
  return res.status(StatusCodes.OK).json(menus.map(Menu.toResponse));
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const menu = await menusService.getById(menuId);
  if (!menu) {
    throw new CatchErrors('Menu not found', StatusCodes.NOT_FOUND, 'MENU_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Menu.toResponse(menu));
});

const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const menu = await menusService.updateById(menuId, req.body);
  if (!menu) {
    throw new CatchErrors('Menu not found', StatusCodes.NOT_FOUND, 'MENU_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(menu && Menu.toResponse(menu));
});

const deleteById = asyncHandler(async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const menu = await menusService.deleteById(menuId);
  if (!menu) {
    throw new CatchErrors('Menu not found', StatusCodes.NOT_FOUND, 'MENU_NOT_FOUND');
  }
  return res.status(StatusCodes.OK).json(Menu.toResponse(menu));
});

export default { create, getAll, getById, updateById, deleteById };