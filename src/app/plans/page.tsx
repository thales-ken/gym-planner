'use client';

import { planImageStorage, plansTable } from '@/lib/mockData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/protected-route';

function PlansContent() {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id ?? 'user_1';

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-20">
        <button 
          onClick={() => router.back()}
          className="text-white flex size-12 shrink-0 items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">arrow_back_ios</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Workout Plans
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-gray-500 dark:text-gray-400 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col gap-4 p-4">
          {plansTable.map((plan) => (
            <Link
              key={plan.id}
              href={`/plans/${plan.id}`}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform active:scale-[0.98]"
            >
              <div
                className="bg-cover bg-center flex flex-col items-stretch justify-end h-48"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0.1) 100%), url("${planImageStorage[plan.id] || plan.image}")`
                }}
              >
                <div className="flex w-full items-end justify-between gap-4 p-5">
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-white tracking-tight text-2xl font-bold leading-tight">
                      {plan.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/30 text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-primary/20 backdrop-blur-md">
                        {plan.routineIds.length} Routines
                      </span>
                      <span className="text-gray-300 text-xs">• {plan.difficulty}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-white/50">chevron_right</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-20">
        <button className="flex items-center justify-center bg-primary text-white w-16 h-16 rounded-full shadow-[0_8px_30px_rgb(19,146,236,0.4)] transition-transform active:scale-90 focus:outline-none">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
}

export default function PlansPage() {
  return (
    <ProtectedRoute>
      <PlansContent />
    </ProtectedRoute>
  );
}
