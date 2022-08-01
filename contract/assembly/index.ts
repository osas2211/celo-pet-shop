import {
  Pet,
  Pets,
  set_owner,
  get_owner,
  check_initialized,
  initialize,
  set_adoption_fee,
  get_adoption_fee,
} from "./model";
import { u128, ContractPromiseBatch, context } from "near-sdk-as";

// Public -init function, define the owner of the pet-shop, can only be called once.
export function init(owner: string, fee: u128): void {
  assert(context.predecessor == context.contractName, "Method init is private");
  // check if contract is already initialized
  const initialized: bool = check_initialized();
  assert(!initialized, "Contract already initialized");
  initialize();
  set_owner(owner);
  set_adoption_fee(fee);
}

// List pet for adoption
export function listPet(pet: Pet): void {
  runChecks("user");
  let storedPet = Pets.get(pet.id);
  if (storedPet !== null) {
    throw new Error(`a product with ${pet.id} already exists`);
  }

  Pets.set(pet.id, Pet.fromPayload(pet));
}

// Return a specific pet with ID
export function getPet(id: string): Pet | null {
  return Pets.get(id);
}

// Return all pets
export function getPets(): Pet[] {
  return Pets.values();
}

// Adopt Pet
export function adoptPet(petId: string): void {
  runChecks("user");
  const pet = getPet(petId);
  if (pet == null) {
    throw new Error("pet not found");
  }
  const Fee = getFee();
  if (Fee.toString() !== context.attachedDeposit.toString()) {
    throw new Error(
      "attached deposit should be equal to the pet's addoption fee"
    );
  }
  const owner = get_owner();
  ContractPromiseBatch.create(owner).transfer(context.attachedDeposit);
  pet.adopter = context.sender;
  Pets.set(pet.id, pet);
}

// Get Adoption Fee
export function getFee(): u128 {
  const Fee: u128 = get_adoption_fee();
  return Fee;
}

// Update Adoption Fee
export function updateFee(fee: u128): void {
  runChecks("owner");
  set_adoption_fee(fee);
}

// Transfer ownership to another contract
export function transferOwnership(newOwner: string): void {
  runChecks("owner");
  set_owner(newOwner);
}

// returns owner id
export function getOwner(): string {
  const owner: string = get_owner();
  return owner;
}

// checks if contract is initialized for users and if context is owner
function runChecks(account: string): void {
  if (account == "owner") {
    const initialized: bool = check_initialized();
    assert(initialized, "Contract not yet initialized");
    const owner = getOwner();
    assert(
      owner == context.predecessor,
      "only contract owner can call this function"
    );
  } else if (account == "user") {
    const initialized: bool = check_initialized();
    assert(initialized, "Contract not yet initialized");
  }
}
