import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro legal",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with existent license plate", async () => {
    await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro legal",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Volkswagen",
      category_id: "category_id",
    });

    expect(
      createCarUseCase.execute({
        name: "Fusca 2",
        description: "Carro legal",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Volkswagen",
        category_id: "category_id",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("Should not be able to create a car with with true availbility by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    });

    expect(car.available).toBe(true);
  });
});
