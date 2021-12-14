import Category from './category.model';
import { ICategory, IBaseCategory, IBaseCategoryPartial } from './category.interface';

import Dish from '../dishs/dish.model';

const create = async (menuId: string = '', payload: IBaseCategory): Promise<ICategory> => {
  const categoryCreatable = { ...payload, menuId };
  return Category.create(categoryCreatable);
};

const getAll = async (): Promise<ICategory[]> => Category.getAll();

const getById = async (id: string = ''): Promise<ICategory | null> => Category.getById(id);

const updateById = async (id: string = '', payload: IBaseCategoryPartial): Promise<ICategory | null> =>
  Category.updateById(id, payload);

const getAllByMenuId = async (menuId: string = ''): Promise<ICategory[]> =>
  Category.getAllByMenuId(menuId);

const deleteById = async (id: string = ''): Promise<ICategory | null> => {
   const categoryDeleted = await Category.deleteById(id);
  
  if (categoryDeleted) {
    const categorys = await Dish.findAll((dish) => dish.categoryId === categoryDeleted.id);
    categorys.forEach((category) => Dish.updateById(category.id, { categoryId: "null" }));
  }
  
  return categoryDeleted;
 };

export default { create, getAll,getAllByMenuId, getById, updateById, deleteById };