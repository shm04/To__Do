import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <section className="main">
      <Navbar />
      <div className="content">
        <TaskForm />
        <TaskList />
      </div>
    </section>
  );
};

export default Dashboard;
