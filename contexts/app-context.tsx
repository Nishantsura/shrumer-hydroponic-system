"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, TabType, Colony, Plant, Task, Notification } from '@/lib/schema';
import { MOCK_APP_STATE } from '@/lib/mock-data';

// Action types
type AppAction =
  | { type: 'SET_SELECTED_TAB'; payload: TabType }
  | { type: 'SET_SELECTED_COLONY'; payload: Colony | undefined }
  | { type: 'UPDATE_COLONY'; payload: Colony }
  | { type: 'UPDATE_PLANT'; payload: Plant }
  | { type: 'COMPLETE_TASK'; payload: { taskId: string; completedBy: string } }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_ONBOARDING_COMPLETE'; payload: boolean };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SELECTED_TAB':
      return { ...state, selectedTab: action.payload };
    
    case 'SET_SELECTED_COLONY':
      return { ...state, selectedColony: action.payload };
    
    case 'UPDATE_COLONY':
      return {
        ...state,
        colonies: state.colonies.map(colony =>
          colony.id === action.payload.id ? action.payload : colony
        ),
        selectedColony: state.selectedColony?.id === action.payload.id 
          ? action.payload 
          : state.selectedColony
      };
    
    case 'UPDATE_PLANT':
      return {
        ...state,
        colonies: state.colonies.map(colony => ({
          ...colony,
          plants: colony.plants.map(plant =>
            plant.id === action.payload.id ? action.payload : plant
          )
        }))
      };
    
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                status: 'completed' as const,
                completedBy: action.payload.completedBy,
                completedAt: new Date()
              }
            : task
        ),
        colonies: state.colonies.map(colony => ({
          ...colony,
          tasks: colony.tasks.map(task =>
            task.id === action.payload.taskId
              ? {
                  ...task,
                  status: 'completed' as const,
                  completedBy: action.payload.completedBy,
                  completedAt: new Date()
                }
              : task
          )
        }))
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true, readAt: new Date() }
            : notification
        )
      };
    
    case 'SET_ONBOARDING_COMPLETE':
      return { ...state, isOnboardingComplete: action.payload };
    
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  setSelectedTab: (tab: TabType) => void;
  setSelectedColony: (colony: Colony | undefined) => void;
  completeTask: (taskId: string, completedBy: string) => void;
  markNotificationRead: (notificationId: string) => void;
  getUnreadNotificationsCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, MOCK_APP_STATE);

  // Helper functions
  const setSelectedTab = (tab: TabType) => {
    dispatch({ type: 'SET_SELECTED_TAB', payload: tab });
  };

  const setSelectedColony = (colony: Colony | undefined) => {
    dispatch({ type: 'SET_SELECTED_COLONY', payload: colony });
  };

  const completeTask = (taskId: string, completedBy: string) => {
    dispatch({ type: 'COMPLETE_TASK', payload: { taskId, completedBy } });
  };

  const markNotificationRead = (notificationId: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notificationId });
  };

  const getUnreadNotificationsCount = () => {
    return state.notifications.filter(notification => !notification.isRead).length;
  };

  const value: AppContextType = {
    state,
    dispatch,
    setSelectedTab,
    setSelectedColony,
    completeTask,
    markNotificationRead,
    getUnreadNotificationsCount
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
