import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Options from "./options";
import Topic from "./topic";
import TopicsList from "./topics_list";

const AppRoutes: React.FC = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<TopicsList />} />
        <Route path="/index.php" element={<TopicsList />} />
        <Route path="/topic.php" element={<Topic />} />
        <Route path="/options.php" element={<Options />} />
      </Routes>
    </Container>
  );
};

export default AppRoutes;
