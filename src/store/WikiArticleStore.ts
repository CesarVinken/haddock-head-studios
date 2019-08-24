import { observable, action } from "mobx"
import DynamoDbWikiArticle from "../models/DynamoDbWikiArticle"
import { getWikiArticle } from "../lib/api/wikiApi"

class WikiArticleStore {
  @observable
  wikiArticles: DynamoDbWikiArticle[] = []

  @action
  setWikiArticles(wikiArticles: DynamoDbWikiArticle[]) {
    this.wikiArticles = wikiArticles
  }

  @action
  getWikiArticle(title: string) {
    return this.wikiArticles.find(article => article.title === title)
  }
}

export default new WikiArticleStore()
