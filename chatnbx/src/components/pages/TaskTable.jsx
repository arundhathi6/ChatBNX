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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    console.log('tasks:', tasks)
    const [deleteTaskId, setDeleteTaskId] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const navigate = useNavigate();

const fetchData = () =>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log('storedTasks:', storedTasks)
    setTasks(storedTasks);
}

const handleDelete = (item) => {
    let newTask = tasks.filter((ele) => ele.title !== item.title)
    console.log('newTask:', newTask)
    localStorage.setItem("tasks", JSON.stringify(newTask))
    onClose();
};
 
const handleDeleteUser = (taskdata) => {
    setDeleteTaskId(taskdata);
    onOpen();
};


    const handleUpdate = (item) => {
        navigate('/task-manager/update')
        // navigate(`/home/${item._id}`);

    };


    useEffect(() => {
        fetchData()
    }, [handleDeleteUser]);

    return (
        <div>
            <TableContainer>
                <Table variant="striped"  backgroundColor={'#f9d0e7'}>
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
                        {tasks.map((item, idx) => {
                            return (
                                <>
                                    <Tr>
                                        <Td>{idx + 1}</Td>
                                        <Td>{item.title}</Td>
                                        <Td>reminder</Td>
                                        <Td>
                                            <Button
                                                  onClick={() => handleUpdate(item)}
                                                color={'white'}
                                                backgroundColor={'#ff66bc'}
                                            >
                                                Update
                                            </Button>
                                        </Td>
                                        <Td>
                                            <Button
                                            color={'white'}
                                                backgroundColor={'#cb6ce6'}
                                                onClick={() => handleDeleteUser(item)}
                                            >
                                                Delete
                                            </Button>
                                        </Td>
                                    </Tr>
                                </>
                            );
                        })}
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
                                            color={'white'}
                                            backgroundColor={'#fa28a0'}
                                            onClick={() => handleDelete(deleteTaskId)}
                                        >
                                            OK
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TaskTable;