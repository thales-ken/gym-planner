'use client';

import {
  getExerciseCompletionIds,
  getPlanById,
  readExerciseCompletionStorage,
  readRoutineCompletionStorage,
  writeExerciseCompletionStorage,
  writeRoutineCompletionStorage,
} from '@/lib/mockData';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/protected-route';

function RoutineDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  const routineId = params.routineId as string;

  const { user } = useAuth();
  const userId = user?.id ?? 'user_1';

  const plan = getPlanById(planId);
  const routine = plan?.routines.find((r) => r.id === routineId);

  // Track completed exercises
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    () => getExerciseCompletionIds(userId, planId, routineId)
  );

  // Check if all exercises are completed
  const allExercisesCompleted = useMemo(() => {
    return routine ? completedExercises.size === routine.exercises.length : false;
  }, [completedExercises, routine]);

  useEffect(() => {
    const loadCompletedExercises = () => {
      const stored = readExerciseCompletionStorage();
      
      // Check if user has any records for this routine in localStorage
      const routineRecordsInStorage = stored.filter(
        (record) =>
          record.userId === userId &&
          record.planId === planId &&
          record.routineId === routineId
      );

      // If user has interacted with this routine (has storage records), use localStorage as source of truth
      if (routineRecordsInStorage.length > 0) {
        setCompletedExercises(new Set(routineRecordsInStorage.map((r) => r.exerciseId)));
      } else {
        // Otherwise use mock data as initial state
        const base = getExerciseCompletionIds(userId, planId, routineId);
        setCompletedExercises(base);
      }
    };

    loadCompletedExercises();
    window.addEventListener('storage', loadCompletedExercises);

    return () => {
      window.removeEventListener('storage', loadCompletedExercises);
    };
  }, [planId, routineId, userId]);

  // Update routine completion whenever exercises change
  useEffect(() => {
    if (!routine) return;

    const stored = readRoutineCompletionStorage();
    const filtered = stored.filter(
      (record) =>
        !(
          record.userId === userId &&
          record.planId === planId &&
          record.routineId === routineId
        )
    );

    if (allExercisesCompleted) {
      filtered.push({
        id: `rc_${userId}_${planId}_${routineId}`,
        userId,
        planId,
        routineId,
        completedAt: new Date().toISOString(),
      });
    }

    writeRoutineCompletionStorage(filtered);
    
    // Small delay to ensure storage is written before dispatching event
    setTimeout(() => {
      window.dispatchEvent(new Event('routineCompleted'));
    }, 50);
  }, [allExercisesCompleted, planId, routine, routineId, userId]);



  const syncExerciseStorage = (nextCompleted: Set<string>) => {
    const stored = readExerciseCompletionStorage();
    const remaining = stored.filter(
      (record) =>
        !(
          record.userId === userId &&
          record.planId === planId &&
          record.routineId === routineId
        )
    );

    const updated = [
      ...remaining,
      ...Array.from(nextCompleted).map((exerciseId) => ({
        id: `ec_${userId}_${planId}_${routineId}_${exerciseId}`,
        userId,
        planId,
        routineId,
        exerciseId,
        completedAt: new Date().toISOString(),
      })),
    ];

    writeExerciseCompletionStorage(updated);
    // Small delay to ensure storage is written before dispatching event
    setTimeout(() => {
      window.dispatchEvent(new Event('routineCompleted'));
    }, 50);
  };

  const toggleExercise = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      syncExerciseStorage(newSet);
      return newSet;
    });
  };

  if (!routine || !plan) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Routine not found</p>
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
        <h1 className="text-2xl font-bold flex-1 text-center">Routine Details</h1>
        <button className="text-2xl">⋯</button>
      </div>

      {/* Routine Title */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">{routine.name}</h2>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>⏱️ {routine.duration} mins • {routine.exercises.length} exercises</span>
        </div>
      </div>

      {/* Routine Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl mb-1">🔥</p>
          <p className="text-2xl font-bold">{routine.calories}</p>
          <p className="text-xs text-gray-400">kcal</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl mb-1">⚡</p>
          <p className="text-2xl font-bold">{routine.difficulty}</p>
          <p className="text-xs text-gray-400">Level</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-2xl mb-1">📅</p>
          <p className="text-2xl font-bold">{allExercisesCompleted ? 'Done' : 'In Progress'}</p>
          <p className="text-xs text-gray-400">Status</p>
        </div>
      </div>

      {/* Exercises */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Exercises</h2>
          <div className="text-blue-400 text-sm">
            {completedExercises.size}/{routine.exercises.length} completed
          </div>
        </div>

        <div className="space-y-4">
          {routine.exercises.map((exercise) => {
            const isCompleted = completedExercises.has(exercise.id);
            
            return (
              <button
                key={exercise.id}
                onClick={() => toggleExercise(exercise.id)}
                className={`w-full rounded-xl p-4 border transition-all ${
                  isCompleted 
                    ? 'bg-slate-700/50 border-slate-600 opacity-60' 
                    : 'bg-slate-800 border-slate-700 hover:border-blue-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-colors ${
                    isCompleted ? 'bg-green-600' : 'bg-slate-700'
                  }`}>
                    {isCompleted ? '✓' : '💪'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-left">
                        <h3 className={`text-lg font-bold ${isCompleted ? 'line-through' : ''}`}>
                          {exercise.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {exercise.muscleGroups.join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${isCompleted ? 'text-gray-400' : 'text-blue-400'}`}>
                          {exercise.sets} x {exercise.reps}
                        </p>
                        <p className="text-xs text-gray-400">SETS x REPS</p>
                      </div>
                    </div>
                  </div>
                </div>
                {isCompleted && (
                  <div className="mt-2 text-sm text-green-400 font-semibold">
                    ✓ Done
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Success Message */}
      {allExercisesCompleted && (
        <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-2xl p-4 mb-6">
          <div className="flex gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h3 className="font-bold mb-1">Routine Completed!</h3>
              <p className="text-sm text-gray-300">
                Great job! You've completed all exercises in this routine.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Coach's Note */}
      {routine.description && (
        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-2xl p-4 mb-6">
          <div className="flex gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-bold mb-1">Coach's Note</h3>
              <p className="text-sm text-gray-300">{routine.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function RoutineDetailsPage() {
  return (
    <ProtectedRoute>
      <RoutineDetailsContent />
    </ProtectedRoute>
  );
}
