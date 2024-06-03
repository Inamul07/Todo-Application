import React from "react";
import { Typography, Select } from "antd";

const { Text } = Typography;

const SelectWithLabel = ({ label, options, value, defaultValue, onChange }) => {
    return (
        <div
            style={{
                margin: 15,
                display: "flex",
                flexDirection: "row",
                width: "20%",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    color: "white",
                    margin: 10,
                    width: "25%",
                    textAlign: "center",
                }}
            >
                {label}:
            </Text>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                style={{ margin: 10, width: "75%" }}
                type="primary"
            />
        </div>
    );
};

export default SelectWithLabel;
