import React, { Component } from "react"
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom"

import WikiArticleNew from "./wiki/WikiArticleNew"
import WikiArticleContent from "./wiki/WikiArticleContent"
import WikiArticleEdit from "./wiki/WikiArticleEdit"

type MyState = { isLoading: boolean }

interface WikiProps extends RouteComponentProps<any>, React.Props<any> {}

export default class WikiContainer extends Component<WikiProps, MyState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="nav-bar">
          <Link to="../" className="link-back">
            Back to main site
          </Link>
          <h1>BBB Wiki</h1>
          <Link to="../wiki/new">
            <div>New article</div>
          </Link>
        </div>
        <div>
          <Switch>
            <Route
              exact
              path="/wiki/new"
              render={() => {
                return <WikiArticleNew />
              }}
            />
            <Route
              exact
              path="/wiki/:articleId/"
              render={() => {
                return <WikiArticleContent />
              }}
            />
            <Route
              exact
              path="/wiki/:articleId/edit"
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
