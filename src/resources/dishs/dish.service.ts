import Dish from './dish.model';
import { IDish, IBaseDish, IBaseDishPartial } from './dish.interface';

const create = async (categoryId: string = '', payload: IBaseDish): Promise<IDish> => {
  const dishCreatable = { ...payload, categoryId };
  return Dish.create(dishCreatable);
};

const getAll = async (): Promise<IDish[]> => Dish.getAll();

const getById = async (id: string = ''): Promise<IDish | null> => Dish.getById(id);

const updateById = async (id: string = '', payload: IBaseDishPartial): Promise<IDish | null> =>
  Dish.updateById(id, payload);

const deleteById = async (id: string = ''): Promise<IDish | null> => Dish.deleteById(id);

const getAllByCategoryId = async (categoryId: string = ''): Promise<IDish[]> =>
Dish.getAllByCategoryId(categoryId);

export default { create, getAll,getAllByCategoryId, getById, updateById, deleteById };