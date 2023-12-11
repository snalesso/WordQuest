import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IAnimal } from "../models/IAnimal";

@Injectable({
    providedIn: 'root'
})
export class AnimalsService {

    constructor() { }

    public getAll$(): Observable<readonly IAnimal[]> {
        return of([
            { name: 'owl', biome: 'air' },
            { name: 'dog', biome: 'land' },
            { name: 'cat', biome: 'air' },
            { name: 'whale', biome: 'water' },
            { name: 'eagle', biome: 'air' },
            { name: 'shark', biome: 'water' },
        ] as IAnimal[])
    }
}