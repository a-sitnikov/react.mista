import Login from "src/components/login";
import { Link } from "react-router-dom";
import { useTopicMessages } from "src/store/query-hooks";

const forums = {
  "1c": "1С:Предприятие",
  life: "О жизни",
  it: "Информационные технологии",
  job: "Работа",
};

interface IProps {
  topicId: number;
}

const Header: React.FC<IProps> = ({ topicId }) => {
  const { data } = useTopicMessages({ topicId }, { enabled: false });

  return (
    <div className="flex-row">
      <div className="header-left">
        <Login />
      </div>
      <div className="header-right">
        <span id="forum_string" className="bold120">
          <Link
            to={`/index.php?forum=${data?.info.forum}`}
            style={{ textDecoration: "none" }}
          >
            {forums[data?.info.forum]}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
