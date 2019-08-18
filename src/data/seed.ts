import { addAlbums } from "../lib/api/albumApi"
import { addGames } from "../lib/api/gameApi"

import albums from "./albums.json"
import games from "./games.json"

const runSeed = async () => {
  console.log("Start seeding databases")
  await addAlbums(albums)
  await addGames(games)
  console.log("Completed seeding databases")
}

export { runSeed }
