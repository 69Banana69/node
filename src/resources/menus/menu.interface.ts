export interface IBaseMenu {
 
    title: string;
    photo: string,
    isPublish: boolean;
  }
  
  export interface IBaseMenuPartial extends Partial<IBaseMenu> {}
  export interface IBaseMenuResponse extends IBaseMenu {
    id: string;
  }
  
  export interface IMenu extends IBaseMenu {
    id: string;
  
    update(payload: IBaseMenuPartial): Promise<IMenu>;
  }