import { addAlbums } from "../lib/api/albumApi"
import { addGames } from "../lib/api/gameApi"
import { addWikiArticles } from "../lib/api/wikiApi"

import albums from "./albums.json"
import games from "./games.json"
import wiki from "./wiki.json"

const runSeed = async () => {
  console.log("Start seeding databases")
  await addAlbums(albums)
  await addGames(games)
  await addWikiArticles(wiki)
  console.log("Completed seeding databases")
}

export { runSeed }
