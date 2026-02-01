'use client';

import {
  getPlanById,
  getRoutineCompletionIds,
  readRoutineCompletionStorage,
} from '@/lib/mockData';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/protected-route';

function PlanDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  const { user } = useAuth();
  const userId = user?.id ?? 'user_1';
  const plan = getPlanById(planId);
  
  const [completedRoutines, setCompletedRoutines] = useState<Set<string>>(
    () => getRoutineCompletionIds(userId, planId)
  );

  // Calculate plan statistics
  const planStats = useMemo(() => {
    if (!plan) return null;
    
    const totalRoutines = plan.routines.length;
    const averageDuration = Math.round(
      plan.routines.reduce((acc, r) => acc + r.duration, 0) / totalRoutines
    );
    
    return {
      totalRoutines,
      averageDuration,
      frequency: plan.frequency
    };
  }, [plan]);

  // Load completed routines from localStorage/tables
  useEffect(() => {
    const loadCompletedRoutines = () => {
      const stored = readRoutineCompletionStorage();
      
      // Check if user has any records for this plan in localStorage
      const planRecordsInStorage = stored.filter(
        (record) => record.userId === userId && record.planId === planId
      );

      // If user has interacted with this plan (has storage records), use localStorage as source of truth
      if (planRecordsInStorage.length > 0) {
        setCompletedRoutines(new Set(planRecordsInStorage.map((r) => r.routineId)));
      } else {
        // Otherwise use mock data as initial state
        const base = getRoutineCompletionIds(userId, planId);
        setCompletedRoutines(base);
      }
    };

    loadCompletedRoutines();

    window.addEventListener('storage', loadCompletedRoutines);

    const handleRoutineCompleted = () => loadCompletedRoutines();
    window.addEventListener('routineCompleted', handleRoutineCompleted);

    return () => {
      window.removeEventListener('storage', loadCompletedRoutines);
      window.removeEventListener('routineCompleted', handleRoutineCompleted);
    };
  }, [planId, userId]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Plan not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="text-blue-400 text-2xl hover:text-blue-300 transition"
        >
          ←
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center">{plan.name}</h1>
        <button className="text-2xl">⋯</button>
      </div>

      {/* Plan Info Card */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm">ROUTINES</p>
          <p className="text-2xl font-bold">{planStats?.totalRoutines} Days</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">FREQUENCY</p>
          <p className="text-2xl font-bold">{planStats?.frequency}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">ESTIMATED</p>
          <p className="text-2xl font-bold">{planStats?.averageDuration}m</p>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Weekly Schedule</h2>
        </div>

        <div className="space-y-4">
          {plan.routines.map((routine) => {
            const isCompleted = completedRoutines.has(routine.id);
            const muscleGroups = routine.exercises
              .map((e) => e.muscleGroups[0])
              .filter((group, index, self) => self.indexOf(group) === index) // Remove duplicates
              .join(', ');
            
            return (
              <div
                key={routine.id}
                className={`bg-slate-800 rounded-2xl p-4 border transition ${
                  isCompleted 
                    ? 'border-green-500/50 bg-green-900/10' 
                    : 'border-slate-700 hover:border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{isCompleted ? '✓' : '⚙️'}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold">{routine.name}</h3>
                          {isCompleted && (
                            <span className="bg-green-600/30 text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-500/30">
                              Done
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{muscleGroups}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/plans/${planId}/routines/${routine.id}`}
                    className="text-blue-400 font-semibold"
                  >
                    →
                  </Link>
                </div>
                <div className="flex gap-4 mt-3 text-sm text-gray-400">
                  <span>⚡ {routine.exercises.length} Exercises</span>
                  <span>⏱️ {routine.duration} mins</span>
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full mt-6 border-2 border-dashed border-slate-600 rounded-2xl py-4 text-gray-400 hover:text-gray-300 transition font-semibold">
          + Add Routine Day
        </button>
      </div>

      {/* Coach's Note */}
      {plan.description && (
        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-2xl p-4 mb-6">
          <div className="flex gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-bold mb-1">Coach's Note</h3>
              <p className="text-sm text-gray-300">{plan.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mb-20">
        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-full transition">
          ✏️ Edit Plan
        </button>
      </div>
    </div>
  );
}

export default function PlanDetailsPage() {
  return (
    <ProtectedRoute>
      <PlanDetailsContent />
    </ProtectedRoute>
  );
}
