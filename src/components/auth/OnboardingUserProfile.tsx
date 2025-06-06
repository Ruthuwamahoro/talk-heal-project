"use client";
import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, ArrowLeft, Check, Brain, Sparkles } from 'lucide-react';

interface OnboardingStep {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    id: string;
    label: string;
  }[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    question: "What brings you to emoHub?",
    subtitle: "Help us understand your journey",
    options: [
      { id: "manage_emotions", label: "Learn to manage my emotions" },
      { id: "relationships", label: "Build stronger relationships" },
      { id: "healing", label: "Heal from past experiences" },
      { id: "community", label: "Find community and connection" },
      { id: "curious", label: "I'm just curious" }
    ]
  },
  {
    id: 2,
    question: "What best describes your current emotional state?",
    subtitle: "There's no right or wrong answer",
    options: [
      { id: "overwhelmed", label: "Overwhelmed" },
      { id: "numb", label: "Numb" },
      { id: "anxious", label: "Anxious" },
      { id: "hopeful", label: "Hopeful" },
      { id: "motivated", label: "Motivated" }
    ]
  },
  {
    id: 3,
    question: "How do you usually express your feelings?",
    subtitle: "Understanding your communication style",
    options: [
      { id: "journaling", label: "Journaling" },
      { id: "talking", label: "Talking to friends" },
      { id: "private", label: "Keeping it to myself" },
      { id: "creative", label: "Art or creativity" },
      { id: "unsure", label: "I'm not sure" }
    ]
  },
  {
    id: 4,
    question: "What do you hope to gain from this app?",
    subtitle: "Let's align with your goals",
    options: [
      { id: "tools", label: "Practical emotional tools" },
      { id: "vent", label: "A place to vent" },
      { id: "accountability", label: "Accountability and growth" },
      { id: "support", label: "Peer support" },
      { id: "motivation", label: "Daily motivation" }
    ]
  },
  {
    id: 5,
    question: "How much time do you want to spend daily on emoHub?",
    subtitle: "We'll personalize your experience accordingly",
    options: [
      { id: "quick", label: "Less than 5 minutes" },
      { id: "brief", label: "5–15 minutes" },
      { id: "moderate", label: "15–30 minutes" },
      { id: "flexible", label: "As long as I need" }
    ]
  }
];

export const EmoHubOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentStepData = onboardingSteps.find(step => step.id === currentStep);
  const totalSteps = onboardingSteps.length;

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Onboarding complete!', answers);
      setIsVisible(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50/30 to-emerald-50/40 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-rose-300/30 to-pink-400/30 rounded-full blur-3xl animate-pulse transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute bottom-32 right-1/3 w-80 h-80 bg-gradient-to-br from-amber-300/25 to-orange-400/25 rounded-full blur-3xl animate-pulse delay-700 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.01}px) translate(-50%, -50%)`
          }}
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/8 animate-float delay-100">
          <Brain className="w-6 h-6 text-rose-300/50 animate-pulse" fill="currentColor" />
        </div>
        <div className="absolute top-2/3 right-1/8 animate-float delay-700">
          <Sparkles className="w-5 h-5 text-emerald-300/50 animate-pulse delay-500" />
        </div>
        <div className="absolute top-1/6 right-1/4 animate-float delay-300">
          <Heart className="w-7 h-7 text-rose-300/50 animate-pulse delay-200" fill="currentColor" />
        </div>
        <div className="absolute bottom-1/5 left-1/3 animate-float delay-900">
          <Sparkles className="w-4 h-4 text-amber-400/60 animate-pulse delay-800" />
        </div>
      </div>

      <div className={`w-full max-w-4xl transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Brand Header */}
        <div className={`text-center mb-8 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 mb-6 hover:scale-105 transition-all duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full flex items-center justify-center animate-pulse">
              <Brain className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-slate-700 font-semibold text-lg">emoHub</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-center mb-6">
            {onboardingSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                  step.id === currentStep 
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 border-transparent text-white transform scale-110' 
                    : step.id < currentStep
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-transparent text-white'
                    : 'bg-white/80 backdrop-blur-sm border-slate-300 text-slate-600'
                }`}>
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-1 rounded-full transition-all duration-500 ${
                      step.id < currentStep 
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400' 
                        : 'bg-slate-200'
                    }`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center">
            <span className="text-lg font-medium text-slate-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Question Section */}
        <div className={`text-center mb-10 transition-all duration-700 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {currentStepData && (
            <>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-800 leading-tight max-w-3xl mx-auto">
                {currentStepData.question}
              </h2>
              {currentStepData.subtitle && (
                <p className="text-lg text-slate-600 max-w-2xl mx-auto bg-white/30 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  {currentStepData.subtitle}
                </p>
              )}
            </>
          )}
        </div>

        {/* Options */}
        <div className={`mb-12 transition-all duration-700 delay-600 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {currentStepData && (
            <div className="max-w-3xl mx-auto space-y-4">
              {currentStepData.options.map((option, index) => (
                <label 
                  key={option.id}
                  className="group flex items-center gap-4 p-4 cursor-pointer bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl hover:bg-white/80 hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name={`step-${currentStep}`}
                      value={option.id}
                      checked={answers[currentStep] === option.id}
                      onChange={() => handleOptionSelect(option.id)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      answers[currentStep] === option.id
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 border-transparent scale-110'
                        : 'bg-white border-slate-300 group-hover:border-rose-300'
                    }`}>
                      {answers[currentStep] === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                      )}
                    </div>
                  </div>
                  <span className={`text-lg transition-all duration-300 ${
                    answers[currentStep] === option.id 
                      ? 'text-slate-800 font-semibold' 
                      : 'text-slate-700 group-hover:text-slate-800'
                  }`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className={`flex items-center justify-center gap-6 transition-all duration-700 delay-800 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`group flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/50 ${
              currentStep === 1 
                ? 'opacity-50 cursor-not-allowed text-slate-400' 
                : 'text-slate-700 hover:bg-white hover:scale-105 hover:text-slate-800'
            }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[currentStep]}
            className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
              answers[currentStep]
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:from-amber-500 hover:to-emerald-500 hover:scale-105 transform'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">
              {currentStep === totalSteps ? 'Complete Journey' : 'Continue'}
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
          75% { transform: translateY(-10px) rotate(1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};