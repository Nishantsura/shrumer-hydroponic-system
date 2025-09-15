"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { RefillOrder } from '@/lib/schema';

interface RefillHistoryProps {
  refillHistory: RefillOrder[];
}

export function RefillHistory({ refillHistory }: RefillHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#2EE6A8';
      case 'shipped': return '#FFD93D';
      case 'pending': return '#FF6F3C';
      default: return '#6C757D';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'shipped': return '🚚';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-poppins text-foreground">
        Refill History
      </h2>
      
      {refillHistory.length > 0 ? (
        <div className="space-y-3">
          {refillHistory.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="farm-tile p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getStatusIcon(order.status)}</div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {order.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">
                      {item.quantity}x ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-neon-green">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-muted-foreground">No refill history yet.</p>
          <p className="text-sm text-muted-foreground">
            Your first order will appear here.
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="farm-tile p-4"
      >
        <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green">
              {refillHistory.length}
            </div>
            <div className="text-xs text-muted-foreground">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green">
              ${refillHistory.reduce((sum, order) => sum + order.total, 0).toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
