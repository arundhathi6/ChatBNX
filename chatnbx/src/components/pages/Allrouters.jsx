import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatApp from '../ChatApp'
import WeatherApp from '../WeatherApp'
import NewsApp from '../NewsApp'
import TaskManagerApp from '../TaskManagerApp'
import TaskUpdate from './TaskUpdate'

const Allrouters = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ChatApp />} />
                <Route path="/weather" element={<WeatherApp />} />
                <Route path="/news" element={<NewsApp />} />
                <Route path="/task-manager" element={<TaskManagerApp />} />
                <Route path="/task-manager/update" element={<TaskUpdate />} />
            </Routes>
        </div>
    )
}

export default Allrouters