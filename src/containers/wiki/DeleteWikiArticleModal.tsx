import React, { Component } from 'react'
import Modal from 'react-modal'

import WikiArticleStore from '../../store/WikiArticleStore'
import { deleteWikiArticle } from '../../lib/api/wikiApi'
import WikiArticle from '../../models/WikiArticle'
import { Link, RouteComponentProps } from 'react-router-dom'

interface DeleteModalProps extends RouteComponentProps<any>, React.Props<any> {
  toggleDeleteModalVisibility: Function
}

type MyState = { modalIsOpen: boolean }

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('body')

export default class DeleteWikiArticleModal extends Component<
  DeleteModalProps,
  MyState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      modalIsOpen: false
    }

    this._openModal = this._openModal.bind(this)
    this._afterOpenModal = this._afterOpenModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this._deleteArticle = this._deleteArticle.bind(this)
  }

  componentDidMount() {
    this._openModal()
  }

  _openModal() {
    this.setState({ modalIsOpen: true })
  }

  _afterOpenModal() {
    // // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00'
  }

  _closeModal() {
    this.setState({ modalIsOpen: false })
    this.props.toggleDeleteModalVisibility(false)
  }

  render() {
    return (
      <div className="delete-modal">
        SDSFSSDFSD
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this._afterOpenModal}
          onRequestClose={this._closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <h2>Are you sure you want to permanently delete this article?</h2>
          <div className="modal-options-container">
            <div className="button" onClick={this._closeModal}>
              <div>Cancel</div>
            </div>
            <Link
              to={`../`}
              className="button"
              onClick={() => {
                this._deleteArticle()
                this._closeModal()
              }}
            >
              <div>Delete article</div>
            </Link>
          </div>
        </Modal>
      </div>
    )
  }

  _deleteArticle() {
    const article: WikiArticle = {
      articleId: WikiArticleStore.currentWikiArticle.article_id,
      title: WikiArticleStore.currentWikiArticle.title,
      content: WikiArticleStore.currentWikiArticle.content
    }

    deleteWikiArticle(article)
    WikiArticleStore.deleteWikiArticle(article)
  }
}
