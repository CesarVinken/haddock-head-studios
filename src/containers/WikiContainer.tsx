import React, { Component } from "react"
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom"

import WikiArticleNew from "./wiki/WikiArticleNew"
import WikiArticleContent from "./wiki/WikiArticleContent"
import WikiArticleEdit from "./wiki/WikiArticleEdit"
import WikiArticleStore from "../store/WikiArticleStore"
import DynamoDbWikiArticle from "../models/DynamoDbWikiArticle"
import { getAllWikiArticles } from "../lib/api/wikiApi"

type MyState = { isLoading: boolean }

interface WikiProps extends RouteComponentProps<any>, React.Props<any> {}

export default class WikiContainer extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    if (WikiArticleStore.wikiArticles.length === 0) {
      const articles: DynamoDbWikiArticle[] = await getAllWikiArticles()
      WikiArticleStore.setWikiArticles(articles)
    }
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <Link to="../" className="link-back">
            Back to main site
          </Link>
          <h1>BBB Wiki</h1>
          {window.location.href.split("/")[
            window.location.href.split("/").length - 1
          ] !== "new" && (
            <Link to="../wiki/new">
              <div>New article</div>
            </Link>
          )}
        </div>
        <div>
          <Switch>
            <Route
              exact
              path="/wiki/new"
              render={props => <WikiArticleNew {...props} />}
            />
            <Route
              exact
              path="/wiki/:articleTitle/"
              render={props => <WikiArticleContent {...props} />}
            />
            <Route
              exact
              path="/wiki/:articleTitle/edit"
              render={() => {
                return <WikiArticleEdit />
              }}
            />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </div>
    )
  }
}
