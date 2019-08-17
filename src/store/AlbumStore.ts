import { observable, action } from "mobx"
import DynamoDbAlbum from "../models/DynamoDbAlbum"

class AlbumStore {
  @observable
  albums: DynamoDbAlbum[] = []

  @action
  setAlbums(albums: DynamoDbAlbum[]) {
    this.albums = albums
  }
}

export default new AlbumStore()
