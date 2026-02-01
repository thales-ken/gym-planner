'use client';

import {
  getActivePlanForUser,
  getRoutineCompletionIds,
  getUserData,
  planImageStorage,
  readRoutineCompletionStorage,
  routineImageStorage,
  routineScheduleTable,
} from '@/lib/mockData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/protected-route';

function HomeContent() {
  const { user: authUser } = useAuth();
  const userId = authUser?.id ?? 'user_1';
  const userData = getUserData(userId);
  const activePlan = getActivePlanForUser(userId);

  const upcomingRoutines = activePlan?.routines.slice(0, 3) || [];
  const [completedRoutines, setCompletedRoutines] = useState<Set<string>>(
    () => (activePlan ? getRoutineCompletionIds(userId, activePlan.id) : new Set())
  );

  useEffect(() => {
    if (!activePlan) {
      setCompletedRoutines(new Set());
      return;
    }

    const loadCompleted = () => {
      const base = getRoutineCompletionIds(userId, activePlan.id);
      const stored = readRoutineCompletionStorage();
      const merged = new Set(base);

      stored
        .filter((record) => record.userId === userId && record.planId === activePlan.id)
        .forEach((record) => merged.add(record.routineId));

      setCompletedRoutines(merged);
    };

    loadCompleted();
    window.addEventListener('storage', loadCompleted);
    window.addEventListener('routineCompleted', loadCompleted);

    return () => {
      window.removeEventListener('storage', loadCompleted);
      window.removeEventListener('routineCompleted', loadCompleted);
    };
  }, [activePlan?.id, userId]);

  const progress = activePlan && activePlan.routines.length > 0
    ? Math.round((completedRoutines.size / activePlan.routines.length) * 100)
    : 0;

  const profileImage = userData?.profileImage;
  const userName = userData?.name ?? 'Guest';
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary overflow-hidden flex items-center justify-center">
            {profileImage ? (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url("${profileImage}")` }}
              />
            ) : (
              <span className="text-sm font-bold text-white">{initials}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 px-2">
          <p className="text-[#9dadb9] text-xs font-medium uppercase tracking-wider">Welcome back</p>
          <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{userName}</h2>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 bg-white/10 dark:bg-[#1c2227] text-black dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 pb-24">
        {/* Current Plan Card */}
        {activePlan && (
          <div className="p-4">
            <div className="flex flex-col items-stretch justify-start rounded-xl shadow-lg bg-[#1c2227] overflow-hidden border border-white/5">
              <div 
                className="w-full bg-center bg-no-repeat aspect-[16/7] bg-cover relative"
                style={{
                  backgroundImage: `url("${planImageStorage[activePlan.id] || activePlan.image}")`
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-[#1c2227] to-transparent" />
              </div>
              <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 px-4 -mt-8 relative z-10">
                <p className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">{activePlan.name}</p>
                <div className="flex items-end gap-3 justify-between mt-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#9dadb9] text-sm font-medium">
                      {activePlan.frequency} • {activePlan.routines.length} days
                    </p>
                    <p className="text-primary text-xs font-semibold uppercase tracking-widest">Active Plan</p>
                  </div>
                  <Link
                    href={`/plans/${activePlan.id}`}
                    className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-white text-sm font-bold leading-normal transition-transform active:scale-95 shadow-md shadow-primary/20"
                  >
                    <span className="truncate">Continue</span>
                  </Link>
                </div>
                {/* Progress Bar */}
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex gap-6 justify-between items-center">
                    <p className="text-[#9dadb9] text-xs font-medium uppercase tracking-wider">Overall Progress</p>
                    <p className="text-white text-sm font-bold leading-normal">{progress}%</p>
                  </div>
                  <div className="rounded-full bg-[#3b4954] h-2.5 overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between px-4 pb-3 pt-5">
          <h2 className="text-black dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Upcoming Routines</h2>
          <Link href="/plans" className="text-primary text-sm font-semibold">
            View All
          </Link>
        </div>

        {/* Routine Cards List */}
        <div className="flex flex-col gap-2">
          {upcomingRoutines.map((routine, index) => {
            const schedule = routineScheduleTable[routine.id];
            const dayLabel = schedule?.day ?? `Day ${index + 1}`;
            const timeLabel = schedule?.time ?? '—';
            const routineImage = routineImageStorage[routine.id] || activePlan?.image;

            return (
              <div key={routine.id} className="px-4">
                <Link
                  href={`/plans/${activePlan?.id}/routines/${routine.id}`}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white dark:bg-[#1c2227] p-4 shadow-sm border border-black/5 dark:border-white/5 hover:border-primary/30 transition"
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-xs font-bold uppercase tracking-wider">{dayLabel}</span>
                      <span className="size-1 rounded-full bg-[#9dadb9]" />
                      <span className="text-[#9dadb9] text-xs font-medium">{timeLabel}</span>
                    </div>
                    <p className="text-black dark:text-white text-lg font-bold leading-tight">{routine.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-[#9dadb9]">
                        <span className="material-symbols-outlined text-sm">fitness_center</span>
                        <p className="text-xs font-medium">{routine.exercises.length} Exercises</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#9dadb9]">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <p className="text-xs font-medium">{routine.duration} mins</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                    style={{ backgroundImage: `url("${routineImage}")` }}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}
