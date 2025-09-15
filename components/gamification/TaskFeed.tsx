"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '@/lib/schema';
import { useApp } from '@/contexts/app-context';

interface TaskFeedProps {
  tasks: Task[];
}

export function TaskFeed({ tasks }: TaskFeedProps) {
  const { completeTask, state } = useApp();
  
  // Separate tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed').slice(0, 5); // Show last 5 completed

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId, state.currentUser.id);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'water': return '💧';
      case 'nutrient': return '🧪';
      case 'harvest': return '🌾';
      case 'maintenance': return '🔧';
      case 'refill': return '📦';
      default: return '✅';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#FF4757';
      case 'high': return '#FF6F3C';
      case 'medium': return '#FFD93D';
      case 'low': return '#2EE6A8';
      default: return '#6C757D';
    }
  };

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold font-poppins text-foreground">
          Pending Tasks ({pendingTasks.length})
        </h2>
        
        {pendingTasks.length > 0 ? (
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="farm-tile p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getTaskIcon(task.type)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span 
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: getPriorityColor(task.priority) }}
                        >
                          {task.priority}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          +{task.xpReward} XP
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {task.estimatedDuration}min
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleCompleteTask(task.id)}
                    className="px-4 py-2 bg-neon-green text-dark-charcoal rounded-lg font-semibold text-sm hover:bg-neon-green/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Complete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-muted-foreground">No pending tasks! Great job!</p>
          </div>
        )}
      </div>

      {/* Recent Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-poppins text-foreground">
            Recent Completions
          </h2>
          
          <div className="space-y-3">
            {completedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="farm-tile p-4 opacity-75"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">✅</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground line-through">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Completed by {task.completedBy} • +{task.xpReward} XP
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {task.completedAt?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
