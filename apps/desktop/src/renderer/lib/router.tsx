import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AssistantsPage } from '../pages/assistants'
import { CategoriesPage } from '../pages/categories'
import { Chat as ChatPage } from '../pages/Chat'
import { SettingPage } from '../pages/settings'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/assistants" element={<AssistantsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  )
}
