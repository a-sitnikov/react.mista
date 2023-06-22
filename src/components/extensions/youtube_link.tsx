import { FC, ReactElement, useEffect, useState } from 'react';

type IProps = {
  href: string,
}

const getVideoId = (href: string): string | null => {

  let fullHref = href;
  if (href.search(/http/) === -1) fullHref = 'http://' + fullHref;

  try {
    var url = new URL(fullHref);
  } catch (e)  {
    return null;
  }

  if (url.hostname.search(/youtube/) !== -1) {
    return url.searchParams.get('v');

  } else if (url.hostname.search(/youtu\.be/) !== -1) {
    return url.pathname.substring(1)
  }

  return null;
}

const getVideoParams = async (videoId: string): Promise<{ hrefName: string, title: string }> => {

  const apiKey = localStorage.getItem('youtubeApiKey') || 'AIzaSyCztN2QW4Fxw_1YuAHBTOZdYLbzigPz25g';
  let apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&fields=items(snippet(title))&part=snippet&id=${videoId}`;
  const response = await fetch(apiUrl);
  const json = await response.json();

  let title = json.items[0].snippet.title;
  let hrefName = title;
  let maxLength = 50;
  if (title.length > maxLength + 5)
    hrefName = hrefName.substring(0, maxLength) + '...'

  return {
    hrefName,
    title
  }
}

const YoutubeLink: FC<IProps> = ({ href }): ReactElement => {

  let [hrefName, setHrefName] = useState(href);
  let [title, setTitle] = useState('');

  useEffect(() => {

    let isMounted = true;
    const run = async () => {

      const videoId = getVideoId(href);
      if (!videoId)
        return;

      try {
        const params = await getVideoParams(videoId);
        if (isMounted) {
          setHrefName(params.hrefName);
          setTitle(params.title);
        }  

      } catch (e) {
        console.error('youtube', e.message);
      }
    }

    run();

    return () => {isMounted = false};

  }, [href])

  const prefix = 'youtube';
  return (
    <a href={href} title={title}>{`${prefix}: ${hrefName}`}</a>
  )
}

export default YoutubeLink;