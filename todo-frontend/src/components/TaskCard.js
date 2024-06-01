import React, { useState } from "react";
import { Card, Typography, Modal, Button } from "antd";

const { Text } = Typography;

const TaskCard = ({ task, setTaskUpdate, taskUpdate }) => {
    const [open, setOpen] = useState(false);

    const deleteTask = async (taskId) => {
        fetch("http://localhost:8080/task/delete-task/" + taskId, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                setTaskUpdate(!taskUpdate);
                setOpen(false);
            }
        });
    };

    return (
        <Card
            extra={
                <Button onClick={() => setOpen(true)} type="link">
                    View Details
                </Button>
            }
            title={task.title}
            style={{
                width: "50%",
                backgroundColor: "#D2D2D2",
                margin: 15,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{
                        backgroundColor:
                            task.priority === "High"
                                ? "red"
                                : task.priority === "Medium"
                                ? "yellow"
                                : "green",
                        borderRadius: 20,
                        padding: 5,
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>{task.priority}</Text>
                </div>
                <Text>{task.dueDate}</Text>
            </div>
            <Modal
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                centered
                cancelText={"Delete"}
                cancelButtonProps={{
                    danger: true,
                    onClick: () => {
                        deleteTask(task.taskId);
                    },
                }}
            >
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </Modal>
        </Card>
    );
};

export default TaskCard;
