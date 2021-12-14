import { v4 as uuid } from 'uuid';

import menusRepo from './menu.memory.repository';

import{ IMenu, IBaseMenu, IBaseMenuPartial, IBaseMenuResponse } from './menu.interface';

class Menu implements IMenu {
    id: string;

    title: string;

    photo: string;

    isPublish: boolean;

    constructor({
      title = 'title',
      photo = '0',
      isPublish = true,
  }: IBaseMenuPartial = {}) {
    this.id = uuid();
    this.title = title;
    this.photo = photo;
    this.isPublish = isPublish;
  }

  static async create(newdir: IBaseMenu): Promise<IMenu> {
    const menu = new Menu(newdir);
    const menuInserted = await menusRepo.add(menu);
    return menuInserted;
  }

  static async getAll(): Promise<IMenu[]> {
    const menus = await menusRepo.getAll();
    return menus;
  }

  static async getById(id: string): Promise<IMenu | null> {
    const menus = await menusRepo.getAll();
    const idx = menus.findIndex((menu) => menu.id === id);
    if (idx === -1) return null;
    return menus[idx]!;
  }

  static async updateById(id: string, newdir: IBaseMenuPartial): Promise<IMenu | null> {
    const menu = await Menu.getById(id);
    if (!menu) return null;
    return menu.update(newdir);
  }

  async update(newdir: IBaseMenuPartial): Promise<IMenu> {
    const { title, photo, isPublish } = newdir;
    if (title !== undefined) this.title = title;
    if (photo !== undefined) this.photo = photo;
    if (isPublish !== undefined) this.isPublish = isPublish;
 
    return this;
  }

  static async deleteById(id: string): Promise<IMenu | null> {
    const menu = await Menu.getById(id);
    if (!menu) return null;
    return menusRepo.deleteById(menu);
  }

  static toResponse(menu: IMenu): IBaseMenuResponse {
    const { id, title, photo, isPublish } = menu;
    return { id, title, photo, isPublish };
  }
}

export default Menu;