import React from "react";
import "./Home.css";
import Header from "./Header";
import Card from "./Card";
import TaskTable from "./TaskTable";

const Home = () => {
  return (
    <>
      <div className="main">
      <Header />
        <div className="cards">
          <Card title="Create New Task" loc="/new-task" color="violet"/>
          <Card title="Upcoming Tasks" loc="/upcoming-task" color="#51e2f5"/>
          <Card title="Overdue Tasks" loc="/overdue-task" color="#ff5e6c"/>
          <Card title="Completed Tasks" loc="/completed-task" color="#7dd87d"/>
        </div>
        <TaskTable />
      </div>
    </>
  );
};

export default Home;
