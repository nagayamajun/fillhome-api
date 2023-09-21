import { Owner } from "@prisma/client";

export class OwnerEntity implements Owner {
  id: string;
  firebase_uid: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}
