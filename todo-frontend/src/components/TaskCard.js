import React, { useState } from "react";
import { Card, Typography, Modal, Button } from "antd";
import { MdModeEditOutline, MdDelete, MdDone } from "react-icons/md";
import TaskCardModal from "./TaskCardModal";
import EditTaskModal from "./EditTaskModal";
import dayjs from "dayjs";

const { Text } = Typography;

const TaskCard = ({ task, setTaskUpdate, taskUpdate, messageApi }) => {
    const [open, setOpen] = useState(false);
    const [editState, setEditState] = useState(false);

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

    const closeTask = async () => {
        fetch("http://localhost:8080/task/close-task/" + task.taskId, {
            method: "PUT",
        }).then((res) => {
            if (res.ok) {
                messageApi.open({
                    type: "success",
                    content: "Task Closed",
                });
                setOpen(false);
                setTaskUpdate(!taskUpdate);
            } else {
                messageApi.open({
                    type: "error",
                    content: "Task Cannot Be Closed",
                });
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
                width: "100%",
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
                            task.status === "closed"
                                ? "black"
                                : task.priority === "High"
                                ? "red"
                                : task.priority === "Medium"
                                ? "yellow"
                                : "green",
                        borderRadius: 20,
                        padding: 5,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: task.status === "closed" ? "white" : "black",
                        }}
                    >
                        {task.status === "closed" ? task.status : task.priority}
                    </Text>
                </div>
                <Text
                    style={{
                        color:
                            (dayjs(task.dueDate, "DD/MM/YYYY").isBefore(
                                dayjs()
                            ) ||
                                dayjs(task.dueDate, "DD/MM/YYYY").isSame(
                                    dayjs()
                                )) &&
                            task.status !== "closed"
                                ? "red"
                                : "black",
                    }}
                >
                    {task.dueDate}
                </Text>
            </div>
            <Modal
                title={task.title}
                open={open}
                centered
                onCancel={() => setOpen(false)}
                footer={
                    task.status === "Active"
                        ? !editState
                            ? [
                                  <Button
                                      danger
                                      icon={<MdDelete />}
                                      onClick={() => deleteTask(task.taskId)}
                                  >
                                      Delete
                                  </Button>,
                                  <Button
                                      icon={<MdModeEditOutline />}
                                      onClick={() => setEditState(true)}
                                  >
                                      Edit
                                  </Button>,
                                  <Button
                                      type="primary"
                                      onClick={() => closeTask()}
                                      icon={<MdDone />}
                                  >
                                      Mark As Closed
                                  </Button>,
                              ]
                            : []
                        : [
                              <Button
                                  danger
                                  icon={<MdDelete />}
                                  onClick={() => deleteTask(task.taskId)}
                              >
                                  Delete
                              </Button>,
                          ]
                }
            >
                {!editState ? (
                    <TaskCardModal task={task} />
                ) : (
                    <EditTaskModal
                        task={task}
                        taskUpdate={taskUpdate}
                        setTaskUpdate={setTaskUpdate}
                        setOpen={setOpen}
                        setEditState={setEditState}
                        messageApi={messageApi}
                    />
                )}
            </Modal>
        </Card>
    );
};

export default TaskCard;
