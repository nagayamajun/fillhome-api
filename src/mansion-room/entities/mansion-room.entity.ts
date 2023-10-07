export class MansionRoomEntity {
  id: string
  layout: string
  thanks_money: number
  security_deposit: number
  floor_number: number
  rent: number
  stay_fee: number
  maintenance_fee: number
  contract_duration: string
  availableDates?: string[]
  reserve_url?: string
  mansion_id: string
  // mansion_room_photos Photo[]
}