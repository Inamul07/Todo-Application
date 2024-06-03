import React, { useState, useEffect } from "react";
import { Button, Calendar, Layout, message, notification, Badge } from "antd";
import NewTaskModal from "../components/NewTaskModal";
import {
    MdOutlineViewTimeline,
    MdAdd,
    MdLogout,
    MdOutlineFormatListBulleted,
} from "react-icons/md";
import TaskView from "../components/TaskView";
import SelectWithLabel from "../components/SelectWithLabel";
import dayjs from "dayjs";

const { Header, Content } = Layout;

const Home = ({ setAuthenticated, userId }) => {
    const [activeTasks, setActiveTasks] = useState([]);
    const [closedTasks, setClosedTasks] = useState([]);
    const [taskUpdate, setTaskUpdate] = useState(false);
    const [newTaskModal, setNewTaskModal] = useState(false);
    const [messageApi, messageContext] = message.useMessage();
    const [notificationApi, notificationContext] =
        notification.useNotification();

    const [sortType, setSortType] = useState("DueDate");
    const [filterType, setFilterType] = useState("None");
    const [notify, setNotify] = useState(false);
    const [listView, SetListView] = useState(true);

    useEffect(() => {
        if (userId === 0) return;
        fetch(
            "http://localhost:8080/task/get-tasks-with-user-id/" +
                userId +
                "?sortType=" +
                sortType +
                "&filterType=" +
                filterType
        )
            .then((res) => res.json())
            .then((tasks) => {
                setActiveTasks(
                    tasks.filter((task) => task.status === "Active")
                );
                setClosedTasks(
                    tasks.filter((task) => task.status === "closed")
                );
                setNotify(true);
            });
    }, [userId, taskUpdate, sortType, filterType]);

    useEffect(() => {
        const today = dayjs().startOf("day");

        activeTasks.map((task) => {
            const date = dayjs(task.dueDate, "DD/MM/YYYY").startOf("day");
            if (date.isBefore(today)) {
                notificationApi.open({
                    type: "error",
                    message: task.title + " is Past Due",
                    duration: null,
                });
            } else if (date.isSame(today)) {
                notificationApi.open({
                    type: "warning",
                    message: task.title + " is Due Today",
                    duration: null,
                });
            }
        });
    }, [notify]);

    const dateCellRender = (value) => {
        const formattedDate = value.format("DD/MM/YYYY");
        const dailyTasks = activeTasks.filter(
            (task) =>
                dayjs(task.dueDate, "DD/MM/YYYY").format("DD/MM/YYYY") ===
                formattedDate
        );

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#D2D2D2",
                    flexDirection: "column",
                    overflowY: "scroll",
                }}
            >
                {dailyTasks.map((task) => (
                    <Badge
                        key={task.taskId}
                        status={
                            task.priority === "High"
                                ? "error"
                                : task.priority === "Medium"
                                ? "warning"
                                : "success"
                        }
                        text={task.title}
                        style={{ fontSize: 20, fontWeight: "bold" }}
                    />
                ))}
            </div>
        );
    };

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
                        icon={<MdLogout />}
                    >
                        Log Out
                    </Button>
                </div>
            </Header>
            {messageContext}
            {notificationContext}
            <Content
                style={{
                    backgroundColor: "#2D2D2D",
                    padding: 50,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }}
                >
                    <Button
                        style={{ margin: 25 }}
                        onClick={() => setNewTaskModal(true)}
                        type="primary"
                        icon={<MdAdd />}
                    >
                        New Task
                    </Button>
                    <Button
                        style={{ margin: 25 }}
                        type="primary"
                        icon={
                            listView ? (
                                <MdOutlineViewTimeline />
                            ) : (
                                <MdOutlineFormatListBulleted />
                            )
                        }
                        onClick={() => SetListView(!listView)}
                    >
                        {listView ? "Calender View" : "List View"}
                    </Button>
                    <SelectWithLabel
                        label={"Sort By"}
                        options={[
                            { value: "DueDate", label: "Due Date" },
                            {
                                value: "PriorityLowToHigh",
                                label: "Priority (Low To High)",
                            },
                            {
                                value: "PriorityHighToLow",
                                label: "Priority (High To Low)",
                            },
                        ]}
                        value={sortType}
                        onChange={(value) => setSortType(value)}
                        defaultValue={"DueDate"}
                    />
                    <SelectWithLabel
                        label={"Filter"}
                        options={[
                            {
                                value: "None",
                                label: "None",
                            },
                            { value: "PastDue", label: "Past Due" },
                            {
                                value: "DueToday",
                                label: "Due Today",
                            },
                        ]}
                        value={filterType}
                        onChange={(value) => setFilterType(value)}
                        defaultValue={"None"}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {listView ? (
                        <>
                            <TaskView
                                tasks={activeTasks}
                                header={"Active"}
                                taskUpdate={taskUpdate}
                                setTaskUpdate={setTaskUpdate}
                                messageApi={messageApi}
                            />
                            <TaskView
                                tasks={closedTasks}
                                header={"Closed"}
                                taskUpdate={taskUpdate}
                                setTaskUpdate={setTaskUpdate}
                                messageApi={messageApi}
                            />
                        </>
                    ) : (
                        <Calendar
                            style={{ backgroundColor: "#2D2D2D" }}
                            cellRender={dateCellRender}
                        />
                    )}
                </div>
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
