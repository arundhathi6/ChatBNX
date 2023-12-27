import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [filterText, setFilterText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  const fetchData = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  };

  const handleDelete = (item) => {
    let newTask = tasks.filter((ele) => ele?.title !== item.title);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    onClose();
  };

  const handleDeleteUser = (taskdata) => {
    setDeleteTaskId(taskdata);
    onOpen();
  };

  const handleUpdate = (item) => {
    navigate(`/task-manager/update/${item?.id}`);
  };

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  // Apply filter to tasks
  const filteredTasks = tasks.filter((item) =>
    item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, [handleDeleteUser]);

  return (
    <div>
      <Input
        className="p-4 mb-4"
        width={"200px"}
        border={"1px solid skyblue"}
        type="text"
        placeholder="Filter by title..."
        value={filterText}
        onChange={handleFilter}
      />
      <TableContainer>
        <Table variant="striped" backgroundColor={"#f9d0e7"}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Reminder</Th>
              <Th>Update</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTasks.map((item, idx) => {
              return (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{item?.title || "-"}</Td>
                  <Td>reminder</Td>
                  <Td>
                    <Button
                      onClick={() => handleUpdate(item)}
                      color={"white"}
                      backgroundColor={"#ff66bc"}
                    >
                      Update
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      color={"white"}
                      backgroundColor={"#cb6ce6"}
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`Delete ${deleteTaskId?.title}`}
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                color={"white"}
                backgroundColor={"#fa28a0"}
                onClick={() => handleDelete(deleteTaskId)}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default TaskTable;
