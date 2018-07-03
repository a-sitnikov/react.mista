import React, { Component } from 'react'
import { childrenToText } from 'src/utils'
import highlight from './code_highlight'
import './code1c.css'
    
class Code extends Component {

    constructor(props) {
        super(props);

        this.onShowClick = this.onShowClick.bind(this);
        this.state = {hidden: true};

        const { children } = props;
        if (children) {

            const textArr = childrenToText(children);

            this.text = textArr.join('');
            
            // replace double new-lines
            this.text = this.text
                .replace(/\n<br>/g, '\n')
                .replace(/<br>\n/g, '\n')
                .replace(/\r<br>/g, '\n')
                .replace(/<br>\r/g, '\n')
                .replace(/<br>/g, '\n');

            this.text = highlight(this.text);
        }
    }

    onShowClick() {
        this.setState({
            hidden: !this.state.hidden
        })
    }

    render() {

        let buttonText;
        let linesCount = 0;
        if (this.text)
            linesCount = this.text.split("\n").length;

        if (this.state.hidden)
            buttonText = `Показать: ${linesCount} строк`;
        else
            buttonText = 'Скрыть';

        let buttonShow;
        if (linesCount > 7)
            buttonShow = (
                <div className="expand-button-div">
                    <span className="expand-button-span" onClick={this.onShowClick}>{buttonText}</span>
                </div>    
            );

        let preStyle =  { 
        } 
        
        if (this.state.hidden && linesCount > 7) {
            preStyle.overflow = "hidden";
            preStyle.height   = "135px";
        } else {
            preStyle.overflow = "auto";
            preStyle.height   = "auto";
        }    

        return (
            <div style={{marginTop: "5px"}}>
                <pre className="code-pre" style={preStyle} dangerouslySetInnerHTML={{ __html: this.text }}>
                </pre>
                {buttonShow}
            </div>
        )
    }

}

export default Code;