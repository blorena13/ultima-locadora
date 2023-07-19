import { getRentals } from "../../src/controllers/rentals-controller";
import { RentalInput } from "../../src/protocols";
import rentalsRepository from "../../src/repositories/rentals-repository";
import rentalsService from "../../src/services/rentals-service";

describe("Rentals Service Unit Tests", () => {

  beforeEach(()=> {
    jest.clearAllMocks();
  });

  it("should return rentals", async () => {
    jest.spyOn(rentalsRepository, "getRentals").mockResolvedValueOnce([
      { id: 1, closed: false, date: new Date(), endDate: new Date(), userId: 1},
      { id: 1, closed: false, date: new Date(), endDate: new Date(), userId: 2}
    ])
    const rentals = await rentalsService.getRentals();
    expect(rentals).toHaveLength(2);
  });

  it("should return rentals id", async () => {
    const rentalId = 1;
    jest.spyOn(rentalsRepository, "getRentalById").mockResolvedValueOnce(
      { id: 1, closed: false, date: new Date(), endDate: new Date(), userId: 1, 
        movies: [{ id: 1, name: "Movie 1", adultsOnly: false, rentalId: rentalId }]}
    )
    const rentals = await rentalsService.getRentalById(rentalId);
    expect(rentals).toHaveLength(1);
  })

  it("if choose min 1 movie", async () => {

    const rentalInput: RentalInput = {
      userId: 1,
      moviesId: [1]
    }
    jest.spyOn(rentalsService, "createRental").mockResolvedValueOnce(rentalInput);
    const rental = await rentalsService.createRental(rentalInput);
    expect(rentalsService.createRental).toHaveBeenCalledWith(rentalInput);
    expect(rental).toBe(true);
  })

  it("if choose max 4 movie", async () => {

    const rentalInput = {
      userId: 1,
      moviesId: [1, 2, 3, 4, 5]
    }
    jest.spyOn(rentalsService, "createRental").mockResolvedValueOnce(rentalInput);
    expect(rentalsService.createRental).toBe(rentalInput);
  })

  it("if location is false", async () => {

    const rentalId = 1;
    const rentalInput: RentalInput = {
      userId: 1,
      moviesId: [1]
    }

    jest.spyOn(rentalsService, "getRentalById").mockResolvedValueOnce(
      { id: 1, closed: false, date: new Date(), endDate: new Date(), userId: 1, 
      movies: [{ id: 1, name: "Movie 1", adultsOnly: false, rentalId: rentalId }]});

    const rental = await rentalsService.createRental(rentalInput)
    expect(rental).toBe(rentalInput);
  })

  it("", () => {
    expect(true).toBe(true);
  })

})

describe("Movies Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("", () => {
    expect(true).toBe(true);
  })

  it("", () => {
    expect(true).toBe(true);
  })

  it("", () => {
    expect(true).toBe(true);
  })
})