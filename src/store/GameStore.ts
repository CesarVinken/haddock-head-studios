import { observable, action } from "mobx"
import DynamoDbGame from "../models/DynamoDbGame"

class GameStore {
  @observable
  games: DynamoDbGame[] = []

  @action
  setGames(games: DynamoDbGame[]) {
    this.games = games
  }
}

export default new GameStore()
