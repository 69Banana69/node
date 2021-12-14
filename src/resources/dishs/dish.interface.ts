export interface IBaseDish {
    title: string;
    description: string;
    photo: string;
    isPublish: boolean;
    ingredients: string[];
    price: number;
    categoryId: string;
  }
  
  export interface IBaseDishPartial extends Partial<IBaseDish> {}
  export interface IBaseDishResponse extends IBaseDish {
    id: string;
  }
  
  export interface IDish extends IBaseDish {
    id: string;
  
    update(payload: IBaseDishPartial): Promise<IDish>;
  }