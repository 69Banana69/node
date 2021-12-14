import Menu from './menu.model';
import { IMenu, IBaseMenu, IBaseMenuPartial } from './menu.interface';

import Category from '../categorys/category.model';

const create = async (payload: IBaseMenu): Promise<IMenu> => 
  Menu.create(payload);
  
;

const getAll = async (): Promise<IMenu[]> => Menu.getAll();

const getById = async (id: string = ''): Promise<IMenu | null> => Menu.getById(id);

const updateById = async (id: string = '', payload: IBaseMenuPartial): Promise<IMenu | null> =>
  Menu.updateById(id, payload);

const deleteById = async (id: string = ''): Promise<IMenu | null> => {
   const menuDeleted = await Menu.deleteById(id);
  
  if (menuDeleted) {
    const categorys = await Category.findAll((category) => category.menuId === menuDeleted.id);
    categorys.forEach((category) => Category.updateById(category.id, { menuId: null }));
  }
  
  return menuDeleted;
 };

export default { create, getAll, getById, updateById, deleteById };