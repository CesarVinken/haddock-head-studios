import React, { Component } from 'react'
import WikiArticleStore from '../../store/WikiArticleStore'
import { getAllWikiArticles } from '../../lib/api/wikiApi'
import DynamoDbWikiArticle from '../../models/DynamoDbWikiArticle'
import { Link } from 'react-router-dom'

type MyState = { titles: JSX.Element[]; isLoading: boolean }

export default class WikiArticleSideList extends Component<{}, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      titles: [],
      isLoading: true
    }
    this._updateArticleTitleList = this._updateArticleTitleList.bind(this)
  }

  async componentDidMount() {
    if (WikiArticleStore.wikiArticles.length === 0) {
      this.setState({ isLoading: true })
      const articles: DynamoDbWikiArticle[] = await getAllWikiArticles()
      WikiArticleStore.setWikiArticles(articles)
    }
    this.setState({ isLoading: false })

    this._updateArticleTitleList()
    console.log(
      'The current wiki article is now set: ',
      WikiArticleStore.currentWikiArticle.title
    )
  }

  render() {
    const wikiArticlesTitlesInStore = WikiArticleStore.getAllWikiArticleTitles()
    if (this.state.titles.length !== wikiArticlesTitlesInStore.length) {
      this._updateArticleTitleList()
    }

    return (
      <div className="article-list-wrapper">
        {this.state.isLoading ? (
          <div>Loading articles...</div>
        ) : (
          <div className="article-list-container">{this.state.titles}</div>
        )}
      </div>
    )
  }

  _updateArticleTitleList() {
    const titles: string[] = WikiArticleStore.getAllWikiArticleTitles()
    const jsxTitles: JSX.Element[] = titles.map((title, i) => {
      return (
        <Link
          to={`/wiki/${title}`}
          key={i}
          onClick={() => WikiArticleStore.setCurrentWikiArticle(title)}
        >
          {title}
        </Link>
      )
    })
    this.setState({ titles: jsxTitles })
  }
}
