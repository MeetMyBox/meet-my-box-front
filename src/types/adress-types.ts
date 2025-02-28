export interface AddressProps {
  id: number;
  type: "receiver" | "sender";
  firstName: string;
  phoneNumber: string;
  street: string;
  housing: string;
  building: string;
  apartment: string;
  city: string;
  postal_code: string;
}
export interface IExtendedAddress extends AddressProps {
  country: string;
  lastName: string;
  postalCode: string;
}
