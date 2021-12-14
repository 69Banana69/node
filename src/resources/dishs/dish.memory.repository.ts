import {IDish } from './dish.interface';

const dishs: IDish[] = [];

const add = async (dish: IDish): Promise<IDish> => {
  dishs.push(dish);
  return dish;
};

const getAll = async (): Promise<IDish[]> => dishs;

const deleteById = async ({ id }: IDish): Promise<IDish | null>=> {
  const idx = dishs.findIndex((dish) => dish.id === id);
  if (idx === -1) return null;
  const dishDeletable = dishs[idx]!;
  dishs.splice(idx, 1);
  return dishDeletable;
};

export default { add, getAll, deleteById };