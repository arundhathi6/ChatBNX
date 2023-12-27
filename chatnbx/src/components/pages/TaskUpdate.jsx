import React, { useState, useEffect } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const TaskUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [one, setOne] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchData = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const OneTask =
      storedTasks.length && storedTasks.filter((el) => el?.id == id);
    setOne(OneTask[0]);
    setTasks(storedTasks);
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      if (!one.title) {
        toast({
          title: "Please add task title",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
      const updatedData = tasks.map((task) =>
        task?.id == id ? { ...task, ...one } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedData));
      toast({
        title: "Updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      navigate('/task-manager')
    } catch (err) {
      toast({
        title: "Error occured while updating!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    id ? fetchData() : navigate("/task-manager");
  }, []);

  return (
    <Box className="md:w-[60%] justify-center items-center m-auto mt-[2%]">
      <VStack
        p={10}
        borderRadius="15px"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "right" }}>
          <Button
            onClick={() => {
              navigate("/task-manager");
            }}
            color={"white"}
            backgroundColor={"#fe71b5"}
          >
            Go Back
          </Button>
        </Box>
        <FormControl id="title" isRequired>
          <FormLabel className="text-[#fa28a0]">Title</FormLabel>
          <Input
            name="title"
            placeholder="Add title"
            value={one?.title || ""}
            onChange={(e) =>
              setOne({ ...one, [e.target.name]: e.target.value })
            }
          />
        </FormControl>

        <FormControl id="notes" isRequired>
          <FormLabel className="text-[#fa28a0]">Description</FormLabel>
          <Input
            placeholder="Add description"
            name="notes"
            value={one?.notes || ""}
            onChange={(e) =>
              setOne({ ...one, [e.target.name]: e.target.value })
            }
          />
        </FormControl>

        <FormControl id="link" isRequired>
          <FormLabel className="text-[#fa28a0]">Link</FormLabel>
          <Input
            name="link"
            placeholder="Add link"
            value={one?.link || ""}
            onChange={(e) =>
              setOne({ ...one, [e.target.name]: e.target.value })
            }
          />
        </FormControl>

        <Button
          width="100%"
          marginTop={15}
          onClick={submitHandler}
          isLoading={loading}
          backgroundColor={"#f97da2"}
          color={"white"}
          _hover={{
            bg: "#b5d7fd",
            color: "#5c0830",
          }}
        >
          Update User
        </Button>
      </VStack>
    </Box>
  );
};

export default TaskUpdate;
