//@flow
import React, { Component } from 'react'
import queryString from 'query-string'

import LinkToPost from './link_to_post'
import YoutubeLink from './youtube_link'

import type { DefaultProps } from 'src/components'

type CustomLinkProps = {
    href: string,
}

type Props = CustomLinkProps & DefaultProps;

class CustomLink extends Component<Props> {

    render() {

        const { href, children } = this.props;

        if (href.search(/forum\.mista.ru/) !== -1) {
            let arr = href.split('?');
            if (arr.length > 1) {
                
                let arr2 = arr[1].split('#');
                let hash;
                if (arr2.length > 1) 
                    hash = arr2[1];

                let params = queryString.parse(arr2[0]);
                console.log(params);
                return <LinkToPost topicId={params.id} number={hash || "0"}>{children}</LinkToPost>
            } else {
                return <a href={href}>{children}</a>
            }
        }    

        if (href.search(/youtube/) !== -1
            || href.search(/youtu\.be/) !== -1) {
            return <YoutubeLink href={href} />
        }

        return (
            <a href={href} {...this.props}>{children}</a>
        )
    }
}

export default CustomLink;