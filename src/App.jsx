import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Notes from './pages/Notes/Notes.jsx'
import Snippets from './pages/Snippets/Snippets.jsx'
import SqlPlayground from './pages/SqlPlayground/SqlPlayground.jsx'
import ApiCollection from './pages/ApiCollection/ApiCollection.jsx'
import Search from './pages/Search/Search.jsx'
import Settings from './pages/Settings/Settings.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import ProtectedRoute from './components/app/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/notes" element={<Notes />} />
        <Route path="/app/snippets" element={<Snippets />} />
        <Route path="/app/sql" element={<SqlPlayground />} />
        <Route path="/app/api-collection" element={<ApiCollection />} />
        <Route path="/app/search" element={<Search />} />
        <Route path="/app/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
