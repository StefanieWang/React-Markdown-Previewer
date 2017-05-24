import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import './index.css';
var defaultInput = 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'

class MarkdownInput extends React.Component {
	constructor(){
		super();
		this.state={
			inputText: defaultInput,
		}
	}

	handleChange(e){
      const inputText = e.target.value;
      this.setState({
      	inputText: inputText
      });
      this.props.updatePreviewer(inputText);
	}

   render(){
   	   return (
   	   	<textarea onChange={(e) => this.handleChange(e)}>{this.state.inputText}</textarea>)
   }

}

class Previewr extends React.Component {
	createMarkup(){
		const parsedText = marked(this.props.inputText);
		return {__html: parsedText};
	}

	render() {		
		return (<div className="previewer" dangerouslySetInnerHTML={this.createMarkup()}></div>)
	}

}

class MarkdownPreviewr extends React.Component {
	constructor(){
		super();
		this.state={
			inputText: defaultInput,
		};

		this.updatePreviewer = this.updatePreviewer.bind(this);
	}

	updatePreviewer(inputText){
      this.setState({
      	inputText: inputText
      })
	}

   render(){
   	return (
   		<div className="row">
   		    <div className="col-sm-6">
   		        <MarkdownInput updatePreviewer={this.updatePreviewer} />
   		    </div>
   		    <div className="col-sm-6">
   		        <Previewr inputText={this.state.inputText}/>
   		    </div>  		    
   		</div>)
   }
}

ReactDOM.render(<MarkdownPreviewr />, document.getElementById('root'));
