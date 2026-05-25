// src/config/navigation.js

export const customerDashboardLinks = [
  { label: 'SE BYGGEFORLØB', route: '/customer/process', icon: 'Process.png' },
  { label: 'CHAT', route: '/customer/chat-options', icon: 'Chat.png' },
  { label: 'DOKUMENTER', route: '/customer/documents', icon: 'Files.png' },
];

export const managerDashboardLinks = [
  { label: 'AKTIVE PROJEKTER', route: '/manager/projects', icon: 'ActiveProject.png' },
  { label: 'OPRET PROJEKT', route: '/manager/create-project', icon: 'Plus.png' },
  { label: 'BYGGEFORLØB', route: { name: 'manager-projects', query: { goto: 'process' } }, icon: 'Process.png' },
  { label: 'CHAT', route: { name: 'manager-chat-options' }, icon: 'Chat.png' },
  { label: 'DOKUMENTER', route: { name: 'manager-projects', query: { goto: 'documents' } }, icon: 'Files.png' },
];