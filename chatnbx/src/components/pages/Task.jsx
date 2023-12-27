import { useState } from "react";
import {
  Box,
  Text,
  Link,
  Button,
  Input,
  VStack,
  Textarea,
  useToast,
} from "@chakra-ui/react";

export const Taskfields = ({ addTask }) => {
  const toast = useToast();
  const [newTask, setNewTask] = useState({ title: "", notes: "", link: "", time: "" });
 

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    const taskWithId = { ...newTask, id: Date.now() };
    if (taskWithId.title.trim() === "") {
      alert("Add the Task Title");
    } else {
      addTask(taskWithId);
      toast({
        title: "Task added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
        color: "tomato",
      });
    }

    setNewTask({ title: "", notes: "", link: "", date: "" });
  };
  
  return (
    <VStack spacing={4}>
      <Box className="w-full mt-4">
        <Text className="text-[#fa28a0] items-start font-semibold text-sm ml-3">
          Task Title
        </Text>
        <Input
          style={{ backgroundColor: "white" }}
          lineHeight="2"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
      </Box>
      <Box className="w-full">
        <Text className="text-[#fa28a0] items-start font-semibold text-sm ml-3">
          Task description
        </Text>
        <Textarea
          style={{ backgroundColor: "white" }}
          lineHeight="2"
          name="notes"
          placeholder="Task Notes"
          value={newTask.notes}
          onChange={handleInputChange}
        />
      </Box>

      <Box className="w-full">
        <Text className="text-[#fa28a0] items-start font-semibold text-sm ml-3">
          Add a task link if any?
        </Text>
        <Input
          style={{ backgroundColor: "white" }}
          lineHeight="2"
          name="link"
          placeholder="Task Link"
          value={newTask.link}
          onChange={handleInputChange}
        />
      </Box>

      <Box className="w-full">
        <Text className="text-[#fa28a0] items-start font-semibold text-sm ml-3">
          Add a task reminder?
        </Text>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          style={{ backgroundColor: "white" }}
          lineHeight="2"
          name="date"
          value={newTask.date}
          onChange={handleInputChange}
        />
      </Box>

      <Button
        marginTop={5}
        backgroundColor={"#f97da2"}
        color={"white"}
        _hover={{
          bg: "#d6d6fe",
          color: "#5c0830",
        }}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
    </VStack>
  );
};

export const TaskList = ({ tasks }) => {
  return (
    <VStack spacing={4}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </VStack>
  );
};

export const Task = ({ task }) => {
  return (
    <Box>
      <Text>{task.title}</Text>
      <Text>{task.notes}</Text>
      <Link href={task.link} target="_blank">
        {task.link}
      </Link>
      <Text>{task.date}</Text>
      {/* Due date and reminder display here */}
    </Box>
  );
};