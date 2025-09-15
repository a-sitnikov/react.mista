import { type Property } from "csstype";
import { useEffect, useState } from "react";
import { domainApi } from "src/api";
import { type ITopicMessage } from "src/store";

type IProps = {
  data: ITopicMessage;
};

const UserIco: React.FC<IProps> = ({ data }) => {
  const [imgDisplay, setImgDisplay] = useState<Property.Display>("none");

  const onImageLoad = () => {
    setImgDisplay("inline");
  };

  const onImageError = () => {
    setImgDisplay("none");
  };

  useEffect(() => {
    setImgDisplay("none");
  }, [data.n]);

  if (window.innerWidth <= 768) return null;

  return (
    <img
      src={`${domainApi}/css/user_icons/${data.userId}_16x16.png`}
      alt="user ico"
      onLoad={onImageLoad}
      onError={onImageError}
      style={{
        display: imgDisplay,
        marginBottom: "4px",
        marginRight: "1px",
      }}
    />
  );
};

export default UserIco;
