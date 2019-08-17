import Axios from "axios"
import uuid from "uuid"

import config from "../../config"
import DynamoDbGame from "../../models/DynamoDbGame"

const addGame = async (gameData: any) => {
  console.log("Trying to post")
  const gameId: string = uuid.v1()

  try {
    await Axios({
      method: "post",
      url: `${
        config.proxy.PROXY_URL
      }https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/game`,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: {
        gameId,
        gameName: ""
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const getGame = async (gameName: string) => {
  try {
    const sanatisedGameName = gameName.replace(/ /g, "%20")
    console.log(`Trying to get game "${sanatisedGameName}"`)
    const data = await Axios({
      method: "get",
      url: `${
        config.proxy.PROXY_URL
      }https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/game/${sanatisedGameName}`,
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
      url: `${
        config.proxy.PROXY_URL
      }https://r972v6jm0j.execute-api.us-east-2.amazonaws.com/default/game`,
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

export { addGame, getGame, getAllGames }
