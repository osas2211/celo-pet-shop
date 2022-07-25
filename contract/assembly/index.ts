import { Pet, Pets, ADOPTION_FEE, set_owner, get_owner, check_initilized, initialize } from "./model";
import { ContractPromiseBatch, context } from 'near-sdk-as';

//Public -init function, define the owner of the pet-shop, can only be called once.
export function init(owner: string): void {
    assert(context.predecessor == context.contractName, "Method new is private");
    const initialized: bool = check_initilized();
    assert(!initialized, "Already initialized")
    initialize();
    set_owner(owner);
}

export function listPet(pet: Pet): void {
    const owner: string = get_owner();
    assert(owner == context.contractName, "only contract owner can call this function");
    let storedPet = Pets.get(pet.id);
    if (storedPet !== null) {
        throw new Error(`a product with ${pet.id} already exists`);
    }

    Pets.set(pet.id, Pet.fromPayload(pet));
}

export function getPet(id: string): Pet | null {
    return Pets.get(id);
}

export function getPets(): Pet[] {
    return Pets.values();
}

export function petCount(): i32 {
    return Pets.length;
}

export function adoptPet(petId: string): void {
    const pet = getPet(petId);
    if (pet == null) {
        throw new Error("pet not found");
    }
    if (ADOPTION_FEE.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should be equal to the pet's addoption fee")
    }
    const owner = get_owner();
    ContractPromiseBatch.create(owner).transfer(context.attachedDeposit);
    pet.adopt();
    Pets.set(pet.id, pet);

}