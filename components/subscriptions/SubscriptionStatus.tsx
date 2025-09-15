"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Subscription } from '@/lib/schema';

interface SubscriptionStatusProps {
  subscription: Subscription;
}

export function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  const { status, plan, nextBillingDate, autoRenew } = subscription;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#2EE6A8';
      case 'expired': return '#FF6F3C';
      case 'cancelled': return '#6C757D';
      default: return '#6C757D';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✅';
      case 'expired': return '⚠️';
      case 'cancelled': return '❌';
      default: return '❓';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'family': return '#9B59B6';
      case 'premium': return '#FFD93D';
      case 'basic': return '#2EE6A8';
      default: return '#6C757D';
    }
  };

  const daysUntilBilling = Math.ceil((nextBillingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-4">
      {/* Subscription Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="farm-tile p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{getStatusIcon(status)}</div>
            <div>
              <h3 className="font-semibold text-foreground capitalize">{status} Subscription</h3>
              <p className="text-sm text-muted-foreground">
                {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
              </p>
            </div>
          </div>
          
          <div 
            className="px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: getPlanColor(plan) }}
          >
            {plan.toUpperCase()}
          </div>
        </div>

        {/* Status Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <span 
              className="text-sm font-medium"
              style={{ color: getStatusColor(status) }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Next Billing</span>
            <span className="text-sm font-medium text-foreground">
              {daysUntilBilling > 0 ? `In ${daysUntilBilling} days` : 'Today'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Auto Renewal</span>
            <span className="text-sm font-medium text-foreground">
              {autoRenew ? '✅ Enabled' : '❌ Disabled'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Plan Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="farm-tile p-4"
      >
        <h3 className="font-semibold text-foreground mb-3">Plan Benefits</h3>
        <div className="space-y-2">
          {plan === 'family' && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Unlimited colonies</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Priority support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Family sharing</span>
              </div>
            </>
          )}
          {plan === 'premium' && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Up to 5 colonies</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Email support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Basic analytics</span>
              </div>
            </>
          )}
          {plan === 'basic' && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Up to 2 colonies</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neon-green">✅</span>
                <span className="text-foreground">Community support</span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        <button className="farm-tile farm-tile-interactive p-4 text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-sm font-medium text-foreground">Usage Stats</div>
        </button>
        
        <button className="farm-tile farm-tile-interactive p-4 text-center">
          <div className="text-2xl mb-2">⚙️</div>
          <div className="text-sm font-medium text-foreground">Manage Plan</div>
        </button>
      </motion.div>
    </div>
  );
}
