'use client'

import { useState, useEffect } from 'react'

interface Agent {
  id: string
  name: string
  icon: string
  status: 'active' | 'idle' | 'error'
  description: string
  tasksCompleted: number
  uptime: string
}

interface LogEntry {
  timestamp: string
  message: string
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Data Processor',
      icon: '🤖',
      status: 'active',
      description: 'Processes and analyzes large datasets in real-time with machine learning capabilities.',
      tasksCompleted: 1247,
      uptime: '99.8%'
    },
    {
      id: '2',
      name: 'Code Assistant',
      icon: '💻',
      status: 'active',
      description: 'Provides intelligent code suggestions, reviews, and automated refactoring.',
      tasksCompleted: 892,
      uptime: '99.2%'
    },
    {
      id: '3',
      name: 'Content Generator',
      icon: '✍️',
      status: 'idle',
      description: 'Creates high-quality content including articles, documentation, and marketing copy.',
      tasksCompleted: 634,
      uptime: '98.5%'
    },
    {
      id: '4',
      name: 'Research Agent',
      icon: '🔍',
      status: 'active',
      description: 'Conducts comprehensive research across multiple sources and synthesizes findings.',
      tasksCompleted: 456,
      uptime: '99.5%'
    },
    {
      id: '5',
      name: 'Image Analyzer',
      icon: '🎨',
      status: 'idle',
      description: 'Analyzes images, detects objects, and generates detailed visual descriptions.',
      tasksCompleted: 789,
      uptime: '97.8%'
    },
    {
      id: '6',
      name: 'Task Orchestrator',
      icon: '⚙️',
      status: 'active',
      description: 'Coordinates multiple agents and manages complex multi-step workflows.',
      tasksCompleted: 1123,
      uptime: '99.9%'
    }
  ])

  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: new Date().toLocaleTimeString(), message: 'Data Processor completed batch analysis' },
    { timestamp: new Date(Date.now() - 60000).toLocaleTimeString(), message: 'Code Assistant deployed optimization suggestions' },
    { timestamp: new Date(Date.now() - 120000).toLocaleTimeString(), message: 'Task Orchestrator initiated workflow sequence' },
    { timestamp: new Date(Date.now() - 180000).toLocaleTimeString(), message: 'Research Agent completed market analysis' },
  ])

  const [totalTasks, setTotalTasks] = useState(5141)
  const [activeAgents, setActiveAgents] = useState(4)
  const [avgResponseTime, setAvgResponseTime] = useState('120ms')

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live updates
      const randomAgent = agents[Math.floor(Math.random() * agents.length)]
      const newLog: LogEntry = {
        timestamp: new Date().toLocaleTimeString(),
        message: `${randomAgent.name} ${['completed task', 'processed request', 'updated status', 'optimized performance'][Math.floor(Math.random() * 4)]}`
      }
      setLogs(prev => [newLog, ...prev.slice(0, 9)])
      setTotalTasks(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [agents])

  const handleAgentAction = (action: string) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `System: ${action} command executed`
    }
    setLogs(prev => [newLog, ...prev.slice(0, 9)])
  }

  return (
    <div className="container">
      <div className="header">
        <h1>AI Agents Dashboard</h1>
        <p>Monitor and control your intelligent agents in real-time</p>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <div className="metric-value">{totalTasks}</div>
          <div className="metric-label">Total Tasks</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{activeAgents}/6</div>
          <div className="metric-label">Active Agents</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{avgResponseTime}</div>
          <div className="metric-label">Avg Response</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">99.3%</div>
          <div className="metric-label">Success Rate</div>
        </div>
      </div>

      <div className="agents-grid" style={{ marginTop: '40px' }}>
        {agents.map(agent => (
          <div key={agent.id} className="agent-card">
            <div className="agent-header">
              <span className="agent-icon">{agent.icon}</span>
              <span className={`agent-status status-${agent.status}`}>
                {agent.status}
              </span>
            </div>
            <h3 className="agent-name">{agent.name}</h3>
            <p className="agent-description">{agent.description}</p>
            <div className="agent-stats">
              <div className="stat">
                <div className="stat-label">Tasks</div>
                <div className="stat-value">{agent.tasksCompleted}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Uptime</div>
                <div className="stat-value">{agent.uptime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <h2>System Controls</h2>
        <div className="button-group">
          <button className="btn btn-primary" onClick={() => handleAgentAction('Deploy All Agents')}>
            Deploy All
          </button>
          <button className="btn btn-secondary" onClick={() => handleAgentAction('Pause All Agents')}>
            Pause All
          </button>
          <button className="btn btn-secondary" onClick={() => handleAgentAction('Refresh Status')}>
            Refresh Status
          </button>
          <button className="btn btn-danger" onClick={() => handleAgentAction('Emergency Stop')}>
            Emergency Stop
          </button>
        </div>
      </div>

      <div className="activity-log">
        <h3>Activity Log</h3>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            <div className="log-time">{log.timestamp}</div>
            <div className="log-message">{log.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
