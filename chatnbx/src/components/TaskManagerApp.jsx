import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import TaskManager from './TaskManager'
import TaskTable from './pages/TaskTable'
const TaskManagerApp = () => {
    return (
        <Box w="100%" m={2}>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>One</Tab>
                    <Tab _selected={{ color: 'white', bg: 'green.500' }}>Two</Tab>
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