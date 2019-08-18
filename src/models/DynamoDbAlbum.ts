import DynamoDbTrack from "./DynamoDbTrack"

type DynamoDbAlbum = {
  album_id: string
  album_name: string
  album_cover?: string
  year: number
  description: string
  tracks: DynamoDbTrack[]
}

export default DynamoDbAlbum
