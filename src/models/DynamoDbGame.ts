type DynamoDbGame = {
  game_id: string
  game_name: string
  year: number
  description: string
  headerImage?: string
  genre?: string[]
  screenshots?: string[]
  tile_image?: string
}

export default DynamoDbGame
