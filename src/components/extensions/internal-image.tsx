import dayjs from "dayjs";
import { FC, memo } from "react";
import { PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

type IProps = {
  idx: string;
  topicId: number;
  topicDate: number;
  messageNumber: number;
}

const InternalImage: FC<IProps> = ({ idx, topicId, topicDate, messageNumber }) => {
  const date = dayjs(topicDate).format('YYYY/MM/DD');
  
  //topics/files/2024/02/16/892137/2/1_preview.png
  const filePath = `https://forum.mista.ru/topics/files/${date}/${topicId}/${messageNumber}`
  const preview = `${filePath}/${idx}_preview.png`; 
  const full = `${filePath}/${idx}.png`; 

  return (
    <PhotoView src={full}>
      <img src={preview} alt="" style={{maxWidth: '100%', cursor: 'pointer'}} />
    </PhotoView>
  )
}

export default memo(InternalImage);