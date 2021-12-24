import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  listAllAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
