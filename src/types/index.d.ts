export type TBike = {
  _id:string,
  name:string,
  description:string,
  pricePerHour:number,
  isAvailable:boolean,
  imageUrl:string,
  cc:number,
  year:number,
  model:string,
  brand:string
}
export type TTeamMember = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export type  TMilestone = {
  year: number;
  title: string;
  description: string;
}