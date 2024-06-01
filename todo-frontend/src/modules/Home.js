import React, { useState, useEffect } from "react";
import { Button, Form } from "antd";
import TaskCard from "../components/TaskCard";
import { Layout, message } from "antd";
import NewTaskModal from "../components/NewTaskModal";

const { Header, Content } = Layout;

const Home = ({ setAuthenticated, userId }) => {
    const [tasks, setTasks] = useState([]);
    const [taskUpdate, setTaskUpdate] = useState(false);
    const [newTaskModal, setNewTaskModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (userId === 0) return;
        fetch("http://localhost:8080/task/get-tasks-with-user-id/" + userId)
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, [userId, taskUpdate]);

    return (
        <Layout style={{ height: "100%" }}>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <h1 style={{ color: "#D2D2D2" }}>Todo Application</h1>
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={() => setAuthenticated(false)}
                    >
                        Log Out
                    </Button>
                </div>
            </Header>
            {contextHolder}
            <Content
                style={{
                    backgroundColor: "#2D2D2D",
                    padding: 50,
                }}
            >
                <Button
                    style={{ margin: 15 }}
                    onClick={() => setNewTaskModal(true)}
                    type="primary"
                >
                    New Task
                </Button>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.taskId}
                        task={task}
                        taskUpdate={taskUpdate}
                        setTaskUpdate={setTaskUpdate}
                    />
                ))}
            </Content>
            <NewTaskModal
                userId={userId}
                newTaskModal={newTaskModal}
                setNewTaskModal={setNewTaskModal}
                taskUpdate={taskUpdate}
                setTaskUpdate={setTaskUpdate}
                messageApi={messageApi}
            />
        </Layout>
    );
};

export default Home;
