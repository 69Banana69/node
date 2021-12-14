export interface IBaseCategory {
    title: string;
    photo : string;
    isVisible: boolean;
    menuId: string|null;
  }
  
  export interface IBaseCategoryPartial extends Partial<IBaseCategory> {}
  export interface IBaseCategoryResponse extends IBaseCategory {
    id: string;
  }
  
  export interface ICategory extends IBaseCategory {
    id: string;
  
    update(payload: IBaseCategoryPartial): Promise<ICategory>;
  }