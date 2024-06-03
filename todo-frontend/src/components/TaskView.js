import React from "react";
import { Typography } from "antd";
import TaskCard from "./TaskCard";

const { Text } = Typography;

const TaskView = ({ tasks, header, taskUpdate, setTaskUpdate, messageApi }) => {
    return (
        <div
            style={{
                width: "50%",
                height: "100%",
                padding: 20,
                position: "relative",
                overflowY: "scroll",
            }}
        >
            <Text
                style={{
                    margin: 15,
                    fontSize: 24,
                    color: "white",
                    fontWeight: "bold",
                }}
            >
                {header} ({tasks.length})
            </Text>
            {tasks.map((task) => (
                <TaskCard
                    key={task.taskId}
                    task={task}
                    taskUpdate={taskUpdate}
                    setTaskUpdate={setTaskUpdate}
                    messageApi={messageApi}
                />
            ))}
            <div style={{ height: 50 }}></div>
        </div>
    );
};

export default TaskView;
