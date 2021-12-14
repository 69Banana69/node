import { v4 as uuid } from 'uuid';

import dishsRepo from './dish.memory.repository';

import { IDish, IBaseDish, IBaseDishPartial, IBaseDishResponse } from './dish.interface';

class Dish implements IDish {
    id: string;

    title: string;

    description: string;

    photo: string;

    isPublish: boolean;

    ingredients: string[];

    price: number;

    categoryId: string;

    constructor({
      title = 'title',
      description = '1',
      photo = '0',
      isPublish = false,
      ingredients = ['fish','potato'],
      price = 0,
      categoryId= "null",
    }: IBaseDishPartial = {}) {
      this.id = uuid();
      this.title = title;
      this.description = description;
      this.photo = photo;
      this.isPublish = isPublish;
      this.ingredients = ingredients;
      this.price = price;
      this.categoryId = categoryId;
    }

  static async create(newdish: IBaseDish): Promise<IDish> {
    const dish = new Dish(newdish);
    const dishInserted = await dishsRepo.add(dish);
    return dishInserted;
  }

  static async getAll(): Promise<IDish[]> {
    const dishs = await dishsRepo.getAll();
    return dishs;
  }

  static async getById(id: string): Promise<IDish | null> {
    const dishs = await dishsRepo.getAll();
    const idx = dishs.findIndex((dish) => dish.id === id);
    if (idx === -1) return null;
    return dishs[idx]!;
  }

  static async getAllByCategoryId(categoryId: string): Promise<IDish[]> {
    const dishs = await dishsRepo.getAll();
    return dishs.filter((dish) => dish.categoryId === categoryId);
  }

  static async updateById(id: string, newdish: IBaseDishPartial): Promise<IDish | null> {
    const dish = await Dish.getById(id);
    if (!dish) return null;
    return dish.update(newdish);
  }

  async update(newres: IBaseDishPartial): Promise<IDish> {
    const { title, description, photo, isPublish, ingredients, price, categoryId } = newres;
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (photo !== undefined) this.photo = photo;
    if (isPublish !== undefined) this.isPublish = isPublish;

    if (ingredients !== undefined) this.ingredients = ingredients;
    if (price !== undefined) this.price = price;
    if (categoryId !== undefined) this.categoryId = categoryId;
    
    return this;
  }

  static async findAll(callback: {
    (value: IDish, index?: number, array?: IDish[]): boolean;
  }): Promise<IDish[]> {
    if (typeof callback !== 'function') return [];
    const categorys = await dishsRepo.getAll();
    return categorys.filter(callback);
  }

  static async deleteById(id: string): Promise<IDish | null> {
    const dish = await Dish.getById(id);
    if (!dish) return null;
    return dishsRepo.deleteById(dish);
  }  

  static toResponse(dish: IDish): IBaseDishResponse {
    const { id, title, description, photo, isPublish, ingredients, price, categoryId } = dish;
    return { id, title, description, photo, isPublish, ingredients, price, categoryId };
  }
}

export default Dish;