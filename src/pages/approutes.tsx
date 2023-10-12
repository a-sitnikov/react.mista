import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopicsList from "./topics_list";
import Topic from "./topic";
import Options from "./options";

const AppRoutes = (): ReactElement => {
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
