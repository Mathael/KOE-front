export class GameConfigTemplate {

    // Game configuration with default values
    public maxHeroesPerTeam:number = 5;

    // TODO: Config Timer for each action
    // TODO: Config Timer for end game

    constructor(maxHeroes:number) {
        this.maxHeroesPerTeam = maxHeroes;
    }

}
