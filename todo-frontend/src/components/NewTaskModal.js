import React, { useState } from "react";
import { Form, Modal, Input, Select, DatePicker, Button, message } from "antd";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;

const NewTaskModal = ({
    userId,
    newTaskModal,
    setNewTaskModal,
    taskUpdate,
    setTaskUpdate,
    messageApi,
}) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [form] = useForm();

    const uploadTask = async () => {
        const body = {
            userId: userId,
            title: title,
            description: description,
            priority: priority,
            status: "Active",
            dueDate: dueDate,
        };
        fetch("http://localhost:8080/task/insert-task?userId=" + userId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.ok) {
                setTaskUpdate(!taskUpdate);
                setNewTaskModal(false);
                messageApi.open({
                    type: "success",
                    content: "Task Inserted",
                });
                form.resetFields();
                setTitle("");
                setDescription("");
                setPriority("");
                setDueDate("");
            } else {
                messageApi.open({
                    type: "error",
                    content: "Please Check the Input Values",
                });
            }
        });
    };

    return (
        <Modal
            destroyOnClose={true}
            title={"Create Task"}
            centered
            mask
            open={newTaskModal}
            footer={[]}
            onCancel={() => setNewTaskModal(false)}
        >
            <Form
                form={form}
                name="taskForm"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
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
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewTaskModal;
