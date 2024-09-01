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
export type  TBikeCardProps = {
  bike: TBike;
  status: 'view' | 'delete';
  onDelete?: (id: string) => void;
}

export type TFilterProps = {
  onFilterChange: (filters: FilterState) => void;
}

export type TFilterState ={
  brand: string;
  model: string;
  isAvailable: boolean | null;
  search: string;
}
export type TBookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bike: TBike;
};

export type TNavItem = {
  text: string;
  href?: string;
  dropdown?: boolean;
  onClick?: () => void;
}

export type TDropdownItem = {
  text: string;
  href: string;
}

export type TProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  imageUrl: string;
};

export type TCustomProfile = {
  name: string | "",
  email: string | "",
  phone: string | "",
  address: string | "",
  role: string | ""
}

export type TBookingData = {
  _id: string;
  bikeId: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  bookingStatus: string;
  transactionId: string;
  startTime: string;
  returnTime: string | null;
  totalCost: number;
  isReturned: boolean;
}


export type TUser = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  role: string;
}