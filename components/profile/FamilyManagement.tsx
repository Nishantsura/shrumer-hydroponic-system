"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FamilyMember } from '@/lib/schema';

interface FamilyManagementProps {
  familyMembers: FamilyMember[];
}

export function FamilyManagement({ familyMembers }: FamilyManagementProps) {
  const handleInviteMember = () => {
    console.log('Invite family member');
    // This would open an invite modal
  };

  const handleManageMember = (memberId: string) => {
    console.log('Manage member:', memberId);
    // This would open member management options
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="farm-tile p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Family Members</h3>
        <button
          onClick={handleInviteMember}
          className="px-3 py-1 bg-neon-green text-dark-charcoal rounded-lg text-sm font-medium hover:bg-neon-green/90 transition-colors"
        >
          Invite
        </button>
      </div>

      <div className="space-y-3">
        {familyMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{member.avatar}</div>
              <div>
                <h4 className="font-medium text-foreground">{member.name}</h4>
                <p className="text-sm text-muted-foreground capitalize">
                  {member.role} • Level {member.level}
                </p>
                <p className="text-xs text-muted-foreground">
                  {member.totalXP} XP • {member.tasksCompleted} tasks
                </p>
              </div>
            </div>
            
            <button
              onClick={() => handleManageMember(member.id)}
              className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
            >
              ⚙️
            </button>
          </motion.div>
        ))}
      </div>

      {/* Family Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Family Stats</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total XP</span>
            <span className="font-medium text-foreground">
              {familyMembers.reduce((sum, member) => sum + member.totalXP, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tasks Completed</span>
            <span className="font-medium text-foreground">
              {familyMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
