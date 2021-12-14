import {IMenu } from './menu.interface';

const menus: IMenu[] = [];

const add = async (menu: IMenu): Promise<IMenu> => {
  menus.push(menu);
  return menu;
};

const getAll = async (): Promise<IMenu[]> => menus;

const deleteById = async ({ id }: IMenu): Promise<IMenu | null>=> {
  const idx = menus.findIndex((menu) => menu.id === id);
  if (idx === -1) return null;
  const menuDeletable = menus[idx]!;
  menus.splice(idx, 1);
  return menuDeletable;
};

export default { add, getAll, deleteById };