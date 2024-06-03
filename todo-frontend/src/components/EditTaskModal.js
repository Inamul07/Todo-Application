import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;

const EditTaskModal = ({
    task,
    taskUpdate,
    setTaskUpdate,
    setOpen,
    setEditState,
    messageApi,
}) => {
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [form] = useForm();

    const initialValues = {
        taskTitle: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: dayjs(task.dueDate, "DD/MM/YYYY"),
    };

    const uploadTask = async () => {
        const body = {
            taskId: task.taskId,
            user: task.user,
            title: title,
            description: description,
            priority: priority,
            status: "Active",
            dueDate: dueDate,
        };
        console.log(JSON.stringify(body));
        fetch("http://localhost:8080/task/update-task/" + task.taskId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.ok) {
                setTaskUpdate(!taskUpdate);
                setOpen(false);
                messageApi.open({
                    type: "success",
                    content: "Task Updated",
                });
                form.resetFields();
                setTitle("");
                setDescription("");
                setPriority("");
                setDueDate("");
                setEditState(false);
            } else {
                messageApi.open({
                    type: "error",
                    content: "Please Check the Input Values",
                });
            }
        });
    };

    return (
        <Form
            form={form}
            name="updateTaskForm"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
            initialValues={initialValues}
            onFinish={() => uploadTask()}
        >
            <Form.Item
                name={"taskTitle"}
                rules={[
                    {
                        required: true,
                        message: "Please Enter a Title",
                    },
                    {
                        min: 5,
                        message: "Too small",
                    },
                ]}
                style={{ width: "75%" }}
            >
                <Input
                    size="medium"
                    placeholder="Title"
                    inputMode="text"
                    value={title}
                    allowClear
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
            </Form.Item>
            <Form.Item
                name={"description"}
                rules={[
                    {
                        required: true,
                        message: "Please Enter a Description",
                    },
                    {
                        min: 5,
                        message: "Too small",
                    },
                ]}
                style={{ width: "75%" }}
            >
                <TextArea
                    rows={1}
                    autoSize
                    placeholder="Description"
                    inputMode="text"
                    value={description}
                    allowClear
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                />
            </Form.Item>
            <Form.Item
                name={"priority"}
                rules={[{ required: true, message: "Select a priority" }]}
                style={{ width: "75%" }}
            >
                <Select
                    value={priority}
                    placeholder={"Select Priority"}
                    onChange={(value) => setPriority(value)}
                    options={[
                        { value: "Low", label: "Low" },
                        { value: "Medium", label: "Medium" },
                        { value: "High", label: "High" },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item
                name={"dueDate"}
                rules={[
                    {
                        required: true,
                        message: "Select a date",
                    },
                ]}
                style={{ width: "75%" }}
            >
                <DatePicker
                    value={dueDate}
                    placeholder="Select Date"
                    onChange={(date, dateString) => setDueDate(dateString)}
                    needConfirm
                    format={(value) => value.format("DD/MM/YYYY")}
                    minDate={dayjs(new Date())}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    size="medium"
                    type="primary"
                    htmlType="submit"
                    style={{ margin: 10 }}
                >
                    Save
                </Button>
                <Button
                    size="medium"
                    style={{ margin: 10 }}
                    onClick={() => setEditState(false)}
                >
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditTaskModal;
