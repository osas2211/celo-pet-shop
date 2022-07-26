import { v4 as uuid4 } from "uuid";
import { petDetails } from "../components/petshop/PetCard";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function listPet(pet: petDetails) {
    pet.id = uuid4();
    //@ts-ignore
    return window.contract.listPet({ pet });
}

export function getPetsList() {
    //@ts-ignore
    return window.contract.getPets();
}

export async function adoptPet(params: {id: string, fee: string}){
    const {id, fee} = params;

    //@ts-ignore
    await window.contract.adoptPet({petId : id}, GAS, fee)
}

export function getFee() {
    //@ts-ignore
    return window.contract.getFee();
}