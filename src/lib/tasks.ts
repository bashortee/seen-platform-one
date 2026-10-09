import type { Opportunity, Task } from '@/data/demo'
import { setPreferences } from './preferences'

export function addTask(task: Omit<Task, 'id'>) {
  setPreferences((p) => ({
    tasks: [{ ...task, id: `k${Date.now().toString(36)}` }, ...p.tasks],
  }))
}

export function addTaskFromOpportunity(o: Opportunity) {
  const due = new Date()
  due.setDate(due.getDate() + 14)
  addTask({
    title: o.title,
    status: 'todo',
    priority: o.impact,
    due: due.toISOString().slice(0, 10),
    category: o.category,
    opportunityId: o.id,
  })
}

export function updateTask(id: string, patch: Partial<Task>) {
  setPreferences((p) => ({
    tasks: p.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
  }))
}

export function removeTask(id: string) {
  setPreferences((p) => ({ tasks: p.tasks.filter((t) => t.id !== id) }))
}
