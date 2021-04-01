import { Component } from '@angular/core';
import { Pokemon } from './pokemon';
import { Router } from '@angular/router';
import { PokemonsService} from "./pokemons.service";

@Component({
    selector: 'list-pokemon',
    templateUrl: `./app/pokemons/list-pokemon.component.html`
})
export class ListPokemonComponent {
    private pokemons: Pokemon[] ;
    private title: string=  "Liste des pokémons";

    constructor(private router: Router, private pokemonsService: PokemonsService) {

    }

    ngOnInit() {
        this.pokemonsService.getPokemons()
            .subscribe(pokemons => this.pokemons = pokemons);
    }

    selectPokemon(pokemon: Pokemon){
        console.log("Vous avez cliqué sur" + pokemon.name);
        let link = ['/pokemon', pokemon.id]
        this.router.navigate(link);
    }
}
