import { db } from './db';

export type IListCard = (typeof db)[number];


export interface Slide{
  images: string[],
  title: string,
  type: string,
  color:string,
  price:string,
  id:number
}
