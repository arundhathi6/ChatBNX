import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import { MdOutlineAddTask } from "react-icons/md";
import TaskManager from './TaskManager'
import TaskTable from './pages/TaskTable'
const TaskManagerApp = () => {
    return (
        <Box w="100%" m={2}>
            <Tabs isFitted variant='enclosed' >
                <TabList mb='1em'>
                    <Tab _selected={{ color: 'white', bg: '#f290bc' }}>Add your task&nbsp;<MdOutlineAddTask /></Tab>
                    <Tab _selected={{ color: 'white', bg: '#f290bc' }}>View all tasks</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <TaskManager />
                    </TabPanel>
                    <TabPanel>
                       <TaskTable/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default TaskManagerApp