import { v4 as uuid } from 'uuid';

import categorysRepo from './category.memory.repository';

import{ ICategory, IBaseCategory, IBaseCategoryPartial, IBaseCategoryResponse } from './category.interface';

class Category implements ICategory {

  id: string;

  title: string;

  photo : string;

  isVisible: boolean;

  menuId: string|null;

  constructor({
    title = 'title',
    photo = '0',
    isVisible = true,
    menuId=null,
  }: IBaseCategoryPartial = {}) {
    this.id = uuid();
    this.title = title;
    this.photo = photo;
    this.isVisible = isVisible;
    this.menuId = menuId;
  }

  static async create(newcategory: IBaseCategory): Promise<ICategory> {
    const category = new Category(newcategory);
    const categoryInserted = await categorysRepo.add(category);
    return categoryInserted;
  }

  static async getAll(): Promise<ICategory[]> {
    const categorys = await categorysRepo.getAll();
    return categorys;
  }

  static async getById(id: string): Promise<ICategory | null> {
    const categorys = await categorysRepo.getAll();
    const idx = categorys.findIndex((category) => category.id === id);
    if (idx === -1) return null;
    return categorys[idx]!;
  }

  static async getAllByMenuId(menuId: string): Promise<ICategory[]> {
    const categorys = await categorysRepo.getAll();
    return categorys.filter((category) => category.menuId === menuId);
  }

  static async updateById(id: string, newcategory: IBaseCategoryPartial): Promise<ICategory | null> {
    const category = await Category.getById(id);
    if (!category) return null;
    return category.update(newcategory);
  }

  async update(newcategory: IBaseCategoryPartial): Promise<ICategory> {
    const { title, photo, isVisible, menuId } = newcategory;
    if (title !== undefined) this.title = title;
    if (photo !== undefined) this.photo = photo;
    if (isVisible !== undefined) this.isVisible = isVisible;
    if (menuId !== undefined) this.menuId = menuId;
 ;

    return this;
  }

  static async findAll(callback: {
    (value: ICategory, index?: number, array?: ICategory[]): boolean;
  }): Promise<ICategory[]> {
    if (typeof callback !== 'function') return [];
    const categorys = await categorysRepo.getAll();
    return categorys.filter(callback);
  }
  
  static async deleteById(id: string): Promise<ICategory | null> {
    const category = await Category.getById(id);
    if (!category) return null;
    return categorysRepo.deleteById(category);
  }

  static toResponse(category: ICategory): IBaseCategoryResponse {
    const { id, title, photo, isVisible, menuId } = category;
    return { id, title, photo, isVisible, menuId };
  }
}

export default Category;