"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HardwarePairingProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function HardwarePairing({ data, onUpdate, onNext, onBack }: HardwarePairingProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      onUpdate({ hardwareConnected: true });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">📡</div>
        <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
          Connect Your Hardware
        </h1>
        <p className="text-muted-foreground">
          Pair your hydroponic system with the app
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex items-center justify-center"
      >
        <div className="farm-tile p-8 text-center max-w-sm w-full">
          {!isConnected ? (
            <>
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="font-semibold text-foreground mb-2">Ready to Connect</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Make sure your hydroponic system is powered on and in pairing mode
              </p>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Device'}
              </button>
            </>
          ) : (
            <>
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-semibold text-foreground mb-2">Connected!</h3>
              <p className="text-sm text-muted-foreground">
                Your hydroponic system is now connected
              </p>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3 mt-8"
      >
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isConnected}
          className="flex-1 py-3 bg-neon-green text-dark-charcoal rounded-lg font-semibold hover:bg-neon-green/90 transition-colors disabled:opacity-50"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
