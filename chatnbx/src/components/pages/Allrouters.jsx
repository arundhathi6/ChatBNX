import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatApp from '../ChatApp'
import WeatherApp from '../WeatherApp'
import NewsApp from '../NewsApp'
import TaskManagerApp from '../TaskManagerApp'

const Allrouters = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ChatApp />} />
                <Route path="/weather" element={<WeatherApp />} />
                <Route path="/news" element={<NewsApp />} />
                <Route path="/task-manager" element={<TaskManagerApp />} />
            </Routes>
        </div>
    )
}

export default Allrouters