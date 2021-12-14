import {ICategory } from './category.interface';

const categorys: ICategory[] = [];

const add = async (category: ICategory): Promise<ICategory> => {
  categorys.push(category);
  return category;
};

const getAll = async (): Promise<ICategory[]> => categorys;

const deleteById = async ({ id }: ICategory): Promise<ICategory | null>=> {
  const idx = categorys.findIndex((category) => category.id === id);
  if (idx === -1) return null;
  const categoryDeletable = categorys[idx]!;
  categorys.splice(idx, 1);
  return categoryDeletable;
};

export default { add, getAll, deleteById };