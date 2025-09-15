"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen';
import { AccountSetup } from '@/components/onboarding/AccountSetup';
import { HardwarePairing } from '@/components/onboarding/HardwarePairing';
import { ColonyNaming } from '@/components/onboarding/ColonyNaming';
import { PlantSelection } from '@/components/onboarding/PlantSelection';
import { TutorialWalkthrough } from '@/components/onboarding/TutorialWalkthrough';

type OnboardingStep = 'welcome' | 'account' | 'hardware' | 'naming' | 'plants' | 'tutorial';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    email: '',
    colonyName: '',
    selectedPlants: [] as string[],
    hardwareConnected: false
  });

  const handleNext = () => {
    const steps: OnboardingStep[] = ['welcome', 'account', 'hardware', 'naming', 'plants', 'tutorial'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      // Complete onboarding
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    const steps: OnboardingStep[] = ['welcome', 'account', 'hardware', 'naming', 'plants', 'tutorial'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const updateData = (data: Partial<typeof onboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={handleNext} onSkip={handleSkip} />;
      case 'account':
        return (
          <AccountSetup 
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'hardware':
        return (
          <HardwarePairing 
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'naming':
        return (
          <ColonyNaming 
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'plants':
        return (
          <PlantSelection 
            data={onboardingData}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'tutorial':
        return (
          <TutorialWalkthrough 
            onComplete={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return <WelcomeScreen onNext={handleNext} onSkip={handleSkip} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
