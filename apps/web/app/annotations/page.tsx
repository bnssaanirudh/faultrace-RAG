'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Search, Users } from 'lucide-react';

export default function AnnotationsPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [annotationResult, setAnnotationResult] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [assignment, setAssignment] = useState<any | null>(null);

  // MOCK user id for the pilot
  const USER_ID = "pilot_user_1";

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await api.listAnnotationTasks();
      setTasks(data);
    } catch (e) {
      console.error("Failed to load tasks", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSelectTask(task: any) {
    setSelectedTask(task);
    setAnnotationResult('');
    setAssignment(null);
    try {
      // Assign automatically when selected for pilot simplicity
      const asn = await api.assignAnnotationTask(task.task_id, USER_ID);
      setAssignment(asn);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSubmit() {
    if (!assignment) return;
    setSubmitting(true);
    try {
      await api.submitAnnotation(assignment.assignment_id, { text: annotationResult }, 15);
      setSelectedTask(null);
      await loadTasks();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8 animate-fade-in text-slate-100 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ClipboardCheck className="h-5 w-5 text-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-500 font-mono">Track T</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Human Annotation Workflow</h1>
          <p className="mt-1 text-sm text-slate-400">
            Rigorous manual adjudication and evidence review for the Track T pilot.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
        {/* Task List */}
        <div className="col-span-12 md:col-span-4 h-full flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-white/[0.06] p-4 bg-white/[0.02]">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                Annotation Queue
              </h3>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter tasks..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-md py-1.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {loading ? (
                <div className="p-4 text-center text-xs text-slate-500">Loading tasks...</div>
              ) : tasks.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">No tasks in queue.</div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.task_id}
                    onClick={() => handleSelectTask(task)}
                    className={`p-3 rounded-md mb-2 cursor-pointer border transition-colors ${
                      selectedTask?.task_id === task.task_id
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-[10px] text-orange-400">{task.task_id.substring(0,12)}...</span>
                      <Badge variant={task.status === 'completed' ? 'success' : task.status === 'pending' ? 'neutral' : 'warning'}>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300 truncate mt-2">{task.context_payload?.question || "No question provided"}</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Annotation Workspace */}
        <div className="col-span-12 md:col-span-8 h-full flex flex-col">
          {selectedTask ? (
            <Card className="flex-1 flex flex-col overflow-hidden">
              <div className="border-b border-white/[0.06] p-4 bg-white/[0.02] flex justify-between items-center">
                <h3 className="font-semibold text-orange-500 font-mono text-sm">
                  TASK: {selectedTask.task_id}
                </h3>
                <Badge variant="neutral">Assigned to: {USER_ID}</Badge>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Target Question</h4>
                  <div className="text-lg font-medium text-white p-4 bg-white/[0.03] rounded border border-white/[0.06]">
                    {selectedTask.context_payload?.question || "Question missing"}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Evidence Context</h4>
                  <div className="p-4 bg-white/[0.02] rounded border border-white/[0.04] text-sm text-slate-300 font-mono whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                    {JSON.stringify(selectedTask.context_payload?.evidence || {}, null, 2)}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/[0.06] bg-black/20">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Your Annotation</h4>
                <textarea
                  className="w-full bg-white/[0.03] border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors resize-none mb-3"
                  rows={4}
                  placeholder="Provide your annotation, rationale, or corrections here..."
                  value={annotationResult}
                  onChange={(e) => setAnnotationResult(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setSelectedTask(null)}>Cancel</Button>
                  <Button variant="primary" className="bg-orange-600 text-white hover:bg-orange-700" onClick={handleSubmit} loading={submitting}>
                    Submit Adjudication
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.01]">
              <div className="text-center text-slate-500">
                <ClipboardCheck className="h-8 w-8 mx-auto mb-3 opacity-20" />
                <p>Select a task from the queue to begin annotating.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
