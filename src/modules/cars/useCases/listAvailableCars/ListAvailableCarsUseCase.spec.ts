import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ford KA",
      description: "Carro bom",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Ford",
      category_id: "Category 1",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category, name and brand", async () => {
    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Carro 2",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Brand 2",
      category_id: "Category 2",
    });

    const car3 = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Carro 3",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Brand 3",
      category_id: "Category 3",
    });

    const car4 = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Carro 4",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Brand 4",
      category_id: "Category 4",
    });

    const cars2 = await listAvailableCarsUseCase.execute({
      brand: "Brand 2",
    });

    expect(cars2).toEqual([car2]);

    const cars3 = await listAvailableCarsUseCase.execute({
      name: "Car 3",
    });

    expect(cars3).toEqual([car3]);

    const cars4 = await listAvailableCarsUseCase.execute({
      category_id: "Category 4",
    });

    expect(cars4).toEqual([car4]);
  });
});
