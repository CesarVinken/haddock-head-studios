import DynamoDbTrack from "./DynamoDbTrack"

type DynamoDbAlbum = {
  album_id: string
  album_name: string
  year: number
  tracks: DynamoDbTrack[]
}

export default DynamoDbAlbum
