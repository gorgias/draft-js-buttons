import React, { Component } from 'react';
import {
  RichUtils,
  Entity,
  EditorState,
} from 'draft-js';

export default ({ children }) => (
  class linkButton extends Component {

    activate = (event) => {
      console.log(event);
      event.preventDefault();
      event.stopPropagation();
      const url = window.prompt('Enter/Paste URL...');
      const editorState = this.props.getEditorState();
      if (url) {
        const entityKey = Entity.create('link', 'IMMUTABLE', { url });
        this.props.setEditorState(
          RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            entityKey,
          )
        );
      } else {
        this.props.setEditorState(
          RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            null,
          )
        );
      }
      this.props.setEditorState(EditorState.forceSelection(
        editorState,
        editorState.getCurrentContent().getSelectionAfter()
      ));
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {
      const { theme } = this.props;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={theme.button}
            onClick={this.activate}
            type="button"
            children={children}
          />
        </div>
      );
    }
  }
);
