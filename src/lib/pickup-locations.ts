export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  tollFree: string;
  hours: string;
}

export const PICKUP_LOCATIONS: PickupLocation[] = [
  {
    id: "industrial-area",
    name: "Industrial Area - Nairobi",
    address: "Dunga Close, Nairobi, Nairobi",
    tollFree: "0800722211",
    hours: "12:00 AM - 12:00 AM (24 Hours)",
  },
];

export const EXPRESS_PICKUP_FEE = 500;
