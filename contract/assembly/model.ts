import { storage, PersistentUnorderedMap, u128, context } from "near-sdk-core";

@nearBindgen //serializes custom class before storing it on the blockchain
export class Pet {
    id: string;
    petName: string;
    imageURL: string;
    age: string;
    breed: string;
    location: string;
    adopted: bool;
    owner: string;
    public static fromPayload(payload: Pet): Pet { //static method that takses a payload and returns a new Product object
        const pet = new Pet();
        pet.id = payload.id;
        pet.petName = payload.petName;
        pet.imageURL = payload.imageURL;
        pet.age = payload.age;
        pet.breed = payload.breed;
        pet.location = payload.location;
        pet.adopted = false;
        pet.owner = context.sender;
        return pet;
    }

    public adopt(): void {
        this.adopted = true;
        this.owner = context.sender;
    }
}

export const Pets = new PersistentUnorderedMap<string, Pet>("Pets");

//Default Value
const ADOPTION_FEE: u128 = u128.from("1000000000000000000000000");
export const STORAGE_FEE: u128 = u128.from("1000000000000000000000");

export function set_adoption_fee(fee: u128): void {
    storage.set<u128>("fee", fee)
}

export function get_adoption_fee(): u128 {
    if (!storage.contains("fee")) { return ADOPTION_FEE }
    return storage.getSome<u128>("fee")
}

export function set_owner(owner: string): void {
    storage.set<string>("owner", owner)
}
  
export function get_owner(): string {
    return storage.getPrimitive<string>("owner", "pettshop.devfrank.testnet")
}

export function check_initilized(): bool {
    return storage.getPrimitive<bool>('init', false)
}

export function initialize(): void {
    storage.set<bool>('init', true)
}