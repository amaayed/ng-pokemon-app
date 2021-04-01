import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError, map, tap} from "rxjs/operators";
import {error} from "@angular/compiler/src/util";

@Injectable()
export class PokemonsService {

    constructor(private http:HttpClient) {

    }
    private pokemonsUrl = 'api/pokemons';

    private log(log: string){
        console.info(log);
    }

    private handleError<T>(operation='operation', result?: T){
        return (error: any): Observable<T> => {
            console.log(error);
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    searchPokemons(term: string): Observable<Pokemon[]>{
        if(!term.trim()){
            return of([]);
        }

        return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found pokemons matching "${term}"`)),
            catchError(this.handleError<Pokemon[]>('searchPokemons', []))
        );
    }

    deletePokemon(pokemon: Pokemon):Observable<Pokemon>{
        const url = `${this.pokemonsUrl}/${pokemon.id}`;
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.http.delete<Pokemon>(url, httpOptions).pipe(
            tap(_ => this.log(`delete pokemon id=${pokemon.id}`)),
            catchError(this.handleError<Pokemon>('deletePokemon'))
        );
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
            tap(_ => this.log(`updtaed pokemon id=${pokemon.id}`)),
            catchError(this.handleError<any>('updatePokemon'))
        );
    }

    // Retourne tous les pokémons
    getPokemons(): Observable<Pokemon[]> {
        //return POKEMONS;
        return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
            tap(_ => this.log(`fetched pokemons`)),
            catchError(this.handleError(`getPokemons`, []))
        );
    }

    // Retourne le pokémon avec l'identifiant passé en paramètre
    getPokemon(id: number): Observable<Pokemon> {
        //let pokemons = this.getPokemons();

        const url = `${this.pokemonsUrl}/${id}`; // syntaxe ES6

        return this.http.get<Pokemon>(url).pipe(
            tap(_ => this.log(`fetched pokemon id=${id}`)),
            catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
        );

        /*for(let index = 0; index < pokemons.length; index++) {
            if(id === pokemons[index].id) {
                return pokemons[index];
            }
        }*/
    }
    getPokemonTypes(): string[]{
        return [
            'Plante',
            'Feu',
            'Eau',
            'Insecte',
            'Normal',
            'Electrik',
            'Poison',
            'Fée',
            'Vol'
        ];
    }
}
