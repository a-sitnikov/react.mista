//@flow
import React, { Component } from 'react'
import queryString from 'query-string'

import type { DefaultProps } from 'src/components'

type YoutubeLinkProps = {
    href: string,
}

type Props = YoutubeLinkProps;

class YoutubeLink extends Component<Props> {

    state: any;

    constructor(props: Props) {
        super(props);
        this.state = {hrefName: props.href, title: ''};
    }

    getVideoId(href: string): ?string {
        
        console.log(href);
        if (href.search(/youtube/) !== -1) {
            let arr = href.split('?');
            return queryString.parse(arr[1]).v;
        }    

        if (href.search(/youtu\.be/) !==-1) {
            let arr =  href.match(/e\/(.+?)(&|\?|$)/);

            if (arr && arr.length > 1) 
                return arr[1];
        }    
        return null;    
    }

    async getVideoParams(videoId: string): any {
        
        const apiKey = 'AIzaSyBPtVWaQ7iGkObgyavKoNVQdfPwczAdQUE';
        let apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&fields=items(snippet(title))&part=snippet&id=${videoId}`;
        const response = await fetch(apiUrl);
        const json = await response.json();

        let fullTitle = json.items[0].snippet.title;
        let title = fullTitle;
        let maxLength = 50;
        if (fullTitle.length > maxLength + 5) title = title.substring(0, maxLength) + '...'       

        return {
            hrefName: title,
            title: fullTitle
        }
    }

    async componentDidMount() {
        
        const { href } = this.props;
        const videoId = this.getVideoId(href);
        if (!videoId)
            return;

        try {
            const params = await this.getVideoParams(videoId);
            this.setState({
                ...params
            });

        } catch(e) {
            console.error('youtube', e.message);
        }
    }

    render() {
        let prefix = 'youtube';
        return <a href={this.props.href} title={this.state.title}>{`${prefix}: ${this.state.hrefName}`}</a>
    }
}

export default YoutubeLink;