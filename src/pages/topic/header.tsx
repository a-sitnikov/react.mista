import { Link } from "react-router-dom";
import Login from "src/components/login";
import { useTopicMessages } from "src/store/query-hooks";

const forums = {
  "1c": "1С:Предприятие",
  life: "О жизни",
  it: "Информационные технологии",
  job: "Работа",
};

type IProps = {
  topicId: number;
};

const Header: React.FC<IProps> = ({ topicId }) => {
  const { data: forum } = useTopicMessages(
    { topicId },
    {
      enabled: false,
      select: (data) => data?.info.forum,
    }
  );

  return (
    <div className="flex justify-between gap-2">
      <Login />
      <Link
        to={`/index.php?forum=${forum}`}
        style={{ textDecoration: "none" }}
        className="text-lg font-semibold shrink-1 text-end max-md:hidden"
      >
        {forums[forum]}
      </Link>
    </div>
  );
};

export default Header;
