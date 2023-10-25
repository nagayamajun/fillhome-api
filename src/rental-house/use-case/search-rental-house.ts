import { Injectable } from "@nestjs/common";
import { RentalHouseService } from "../rental-house.service";

export type Params = {
  search?: string
  offset?: number
  limit: number
}

@Injectable()
export class SearchRentalHouseUseCase {
  constructor(
    private readonly rentalHouseService: RentalHouseService,
  ) {}
  async handle(params: Params) {  

    if (!params.offset) params.offset = 0;
    const rentalHouse = await this.rentalHouseService.findSearch({search: params.search, offset: Number(params.offset), limit: Number(params.limit)});
    const count = await this.rentalHouseService.findCount(params.search)
    
    return {
      totalCount: count,
      rentalHouse
    }
  }
}