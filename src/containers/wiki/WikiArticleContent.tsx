import React, { Component } from 'react'

import WikiArticleStore from '../../store/WikiArticleStore'
import DynamoDbWikiArticle from '../../models/DynamoDbWikiArticle'
import { RouteComponentProps } from 'react-router'
import ReactMarkdown from 'react-markdown'

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
    if (WikiArticleStore.wikiArticles.length === 0) {
      console.log('we did not yet put wiki articles in the store. Wait.')
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve('done!'), 1500)
      })
      if (WikiArticleStore.wikiArticles.length === 0) {
        await new Promise((resolve, reject) => {
          setTimeout(() => resolve('done!'), 2000)
        })
        if (WikiArticleStore.wikiArticles.length === 0) {
          await new Promise((resolve, reject) => {
            setTimeout(() => resolve('done!'), 2000)
          })
        }
      }
    }

    const article:
      | DynamoDbWikiArticle
      | undefined = WikiArticleStore.wikiArticles.find(
      a => a.title === this.props.match.params.articleTitle
    )

    if (typeof article === 'undefined') {
      console.log('could not find article.')
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
    const contentDisplay = this._getContentDisplay()

    return (
      <div className="article-content-container">
        <div className="title-container">
          <h1>{this.state.title}</h1>
        </div>
        <div>
          {this.state.isLoading && <div>Loading...</div>}
          {contentDisplay}
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

  _getContentDisplay(): JSX.Element {
    const contentDisplay: JSX.Element = (
      <ReactMarkdown source={this.state.content} />
    )

    return contentDisplay
  }
}
