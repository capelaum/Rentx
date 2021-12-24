import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minDaily = 1;

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    // check rent time
    const rentedDays = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    const delayDays = this.dateProvider.compareInDays(
      rental.expected_return_date,
      this.dateProvider.dateNow()
    );

    const dailyDays = rentedDays <= 0 ? minDaily : rentedDays;
    const totalFineAmount = delayDays > 0 ? delayDays * car.fine_amount : 0;
    const total = dailyDays * car.daily_rate + totalFineAmount;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
