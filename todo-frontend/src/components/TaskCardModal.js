import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const TaskCardModal = ({ task }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
            }}
        >
            <div style={{ width: "50%" }}>
                <div style={{ margin: 10 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            display: "block",
                        }}
                    >
                        Description:
                    </Text>
                    <Text style={{ fontSize: 15, display: "block" }}>
                        {task.description}
                    </Text>
                </div>
                <div style={{ margin: 10 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            display: "block",
                        }}
                    >
                        Priority:
                    </Text>
                    <Text style={{ fontSize: 15, display: "block" }}>
                        {task.priority}
                    </Text>
                </div>
            </div>
            <div style={{ width: "50%" }}>
                <div style={{ margin: 10 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            display: "block",
                        }}
                    >
                        Status:
                    </Text>
                    <Text style={{ fontSize: 15, display: "block" }}>
                        {task.status}
                    </Text>
                </div>
                <div style={{ margin: 10 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            display: "block",
                        }}
                    >
                        Due Date:
                    </Text>
                    <Text style={{ fontSize: 15, display: "block" }}>
                        {task.dueDate}
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default TaskCardModal;
