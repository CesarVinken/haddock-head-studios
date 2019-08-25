import { observable, action } from "mobx"
import DynamoDbWikiArticle from "../models/DynamoDbWikiArticle"
import WikiArticle from "../models/WikiArticle"

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

  @action
  addWikiArticle(wikiArticle: WikiArticle) {
    const recastWikiArticle: DynamoDbWikiArticle = {
      article_id: wikiArticle.articleId,
      title: wikiArticle.title,
      content: wikiArticle.content
    }
    this.wikiArticles.push(recastWikiArticle)
  }
}

export default new WikiArticleStore()
