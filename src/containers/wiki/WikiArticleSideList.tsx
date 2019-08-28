import React, { Component } from "react"
import WikiArticleStore from "../../store/WikiArticleStore"
import { getAllWikiArticles } from "../../lib/api/wikiApi"
import DynamoDbWikiArticle from "../../models/DynamoDbWikiArticle"
import { Link } from "react-router-dom"

type MyState = { titles: JSX.Element[] }

export default class WikiArticleSideList extends Component<{}, MyState> {
  constructor(props: any) {
    super(props)
    console.log("MY PROPS", props)
    this.state = {
      titles: []
    }
  }

  async componentDidMount() {
    if (WikiArticleStore.wikiArticles.length === 0) {
      const articles: DynamoDbWikiArticle[] = await getAllWikiArticles()
      WikiArticleStore.setWikiArticles(articles)
    }
    const titles: string[] = WikiArticleStore.getAllWikiArticleTitles()
    const jsxTitles: JSX.Element[] = titles.map((title, i) => {
      return (
        <Link
          to={`../wiki/${title}`}
          key={i}
          onClick={() => WikiArticleStore.setCurrentWikiArticle(title)}
        >
          {title}
        </Link>
      )
    })
    this.setState({ titles: jsxTitles })
    console.log(
      "The current wiki article is now set: ",
      WikiArticleStore.currentWikiArticle.title
    )
  }

  render() {
    return <div className="article-list-container">{this.state.titles}</div>
  }
}
