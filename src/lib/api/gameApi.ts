import Axios from "axios"
import uuid from "uuid"

import config from "../../config"
import DynamoDbGame from "../../models/DynamoDbGame"
import Game from "../../models/Game"

const addGame = async (gameData: Game) => {
  console.log("Trying to post")

  try {
    const gameId: string = uuid.v4()
    console.log("Game:", gameData)
    await Axios({
      method: "post",
      url: `${config.proxy.PROXY_URL}${config.apiGateway.URL}/game`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        gameId,
        gameName: gameData.gameName,
        year: gameData.year,
        description: gameData.description,
        headerImage: gameData.headerImage || "",
        tileImage: gameData.tileImage,
        genre: gameData.genre || [],
        screenshots: gameData.screenshots || []
      }
    })
    console.log("posted game")
    return
  } catch (error) {
    console.log(error)
  }
}

const addGames = async (games: Game[]) => {
  await games.forEach(async game => {
    await addGame(game)
  })
  console.log("Added all games")
}

const getGame = async (gameName: string) => {
  try {
    const sanatisedGameName = gameName.replace(/ /g, "%20")
    console.log(`Trying to get game "${sanatisedGameName}"`)
    const data = await Axios({
      method: "get",
      url: `${config.proxy.PROXY_URL}${config.apiGateway.URL}/game/${sanatisedGameName}`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })

    const gameData: DynamoDbGame = data.data[0]
    console.log("data", gameData)
    return gameData
  } catch (error) {
    console.log(error)
    return error
  }
}

const getAllGames = async () => {
  console.log("Trying to get all games")
  try {
    const res = await Axios({
      method: "get",
      url: `${config.proxy.PROXY_URL}${config.apiGateway.URL}/game`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })

    const games = res.data.Items
    console.log("retrieved games", games)
    return games
  } catch (error) {
    console.log(error)
    return error
  }
}

export { addGame, addGames, getGame, getAllGames }
