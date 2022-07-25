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
    adopter: string;
    public static fromPayload(payload: Pet): Pet { //static method that takses a payload and returns a new Product object
        const pet = new Pet();
        pet.id = payload.id;
        pet.petName = payload.petName;
        pet.imageURL = payload.imageURL;
        pet.age = payload.age;
        pet.breed = payload.breed;
        pet.location = payload.location;
        pet.adopted = false;
        pet.adopter = "";
        return pet;
    }

    public adopt(): void {
        this.adopted = true;
        this.adopter = context.sender;
    }
}

export const Pets = new PersistentUnorderedMap<string, Pet>("Pets");

// Aprox. cost (u128 + string = 16b + 64b = 80b = 800000000000000000000yN)
export const ADOPTION_FEE: u128 = u128.from("1000000000000000000000");

export function set_owner(owner: string): void {
    storage.set<string>("owner", owner)
}

export function get_owner(): string {
    return storage.getPrimitive<string>("owner", "petshop.devfrank.testnet")
}

export function check_initilized(): bool {
    return storage.getPrimitive<bool>('init', false)
}

export function initialize(): void {
    storage.set<bool>('init', true)
}