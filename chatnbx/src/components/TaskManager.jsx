import React, { useState, useEffect } from "react";
import { TaskList, Taskfields } from "./pages/Task";
import { Box, Text } from "@chakra-ui/react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const updateLocalStorage = (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  // Implement other actions (update, delete, filter, sort) here

  return (
    <Box
      className="p-10  md:w-[50%] justify-center items-center m-auto bg-[#ffebf7]"
    >
      <Text className="text-[#ce40d2] text-3xl font-bold flex justify-center mb-5">
        What would you like to do?
      </Text>
      <Taskfields addTask={addTask} />
    </Box>
  );
};

export default TaskManager;
