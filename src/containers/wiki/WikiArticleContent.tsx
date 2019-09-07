import React, { Component } from 'react'

import WikiArticleStore from '../../store/WikiArticleStore'
import DynamoDbWikiArticle from '../../models/DynamoDbWikiArticle'
import { RouteComponentProps } from 'react-router'

type MyState = { title: string; content: string; isLoading: boolean }
interface WikiProps extends RouteComponentProps<any>, React.Props<any> {
  toggleEdit: Function
  toggleDelete: Function
}

export default class WikiArticleContent extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: '',
      content: '',
      isLoading: true
    }

    this._updateDisplayedArticle = this._updateDisplayedArticle.bind(this)
  }

  async componentDidMount() {
    console.log('mounted', this.props)
    if (WikiArticleStore.wikiArticles.length === 0) {
      console.log('we did not yet put wiki articles in the store. Wait.')
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve('done!'), 1000)
      })
    }

    const article:
      | DynamoDbWikiArticle
      | undefined = WikiArticleStore.wikiArticles.find(
      a => a.title === this.props.match.params.articleTitle
    )

    if (typeof article === 'undefined') {
      return
    }
    WikiArticleStore.setCurrentWikiArticle(article.title)
    this.setState({
      isLoading: false,
      title: WikiArticleStore.currentWikiArticle.title,
      content: WikiArticleStore.currentWikiArticle.content
    })
    this.props.toggleEdit(true)
    this.props.toggleDelete(false)
  }

  render() {
    console.log(
      'current article in the store: ',
      WikiArticleStore.currentWikiArticle.title
    )
    console.log('the state: ', this.state.title)
    if (WikiArticleStore.currentWikiArticle.title !== this.state.title) {
      this._updateDisplayedArticle()
    }

    return (
      <div className="article-content-container">
        <div className="title-container">
          <h1>{this.state.title}</h1>
        </div>
        <div>
          {this.state.isLoading && <div>Loading...</div>}
          {this.state.content}
        </div>
      </div>
    )
  }

  _updateDisplayedArticle() {
    console.log('upate displayed article')
    this.setState({
      title: WikiArticleStore.currentWikiArticle.title,
      content: WikiArticleStore.currentWikiArticle.content
    })
  }
}
