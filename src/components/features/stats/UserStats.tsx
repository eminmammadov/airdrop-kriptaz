'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUserStats } from '@/hooks/useUserStats';

interface StatItemProps {
  label: string;
  value: number;
  color: string;
  showSeparator?: boolean;
}

function StatItem({ label, value, color, showSeparator = true }: StatItemProps) {
  return (
    <>
      <div className="flex items-center justify-between py-1.5">
        <div className="flex items-center space-x-3">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-gray-400 text-sm font-normal truncate">{label}</span>
        </div>
        <span className="text-white text-sm font-semibold flex-shrink-0">{value}</span>
      </div>
      {/* Separator line - conditional */}
      {showSeparator && <div className="h-px bg-gray-700/50"></div>}
    </>
  );
}

function DonutChart({ totalUsers, activeUsers, newUsersToday, averageConnections }: {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  averageConnections: number;
}) {
  const size = 140;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calculate dynamic percentages based on real data
  // Use actual values to calculate proportions
  const total = activeUsers + newUsersToday + averageConnections;

  let segments = [];

  if (total > 0) {
    let currentOffset = 0;

    // Active users segment
    const activeProgress = activeUsers / total;
    if (activeProgress > 0) {
      segments.push({
        progress: activeProgress,
        color: '#36D136',
        offset: currentOffset
      });
      currentOffset += activeProgress;
    }

    // New users today segment
    const newUsersProgress = newUsersToday / total;
    if (newUsersProgress > 0) {
      segments.push({
        progress: newUsersProgress,
        color: '#00CBF7',
        offset: currentOffset
      });
      currentOffset += newUsersProgress;
    }

    // Average connections segment
    const connectionsProgress = averageConnections / total;
    if (connectionsProgress > 0) {
      segments.push({
        progress: connectionsProgress,
        color: '#C0F003',
        offset: currentOffset
      });
    }
  } else {
    // Fallback: show empty state
    segments = [
      { progress: 1, color: '#374151', offset: 0 }
    ];
  }



  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1F2937"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {segments.map((segment, index) => {
          const segmentLength = segment.progress * circumference;
          const rotation = segment.offset * 360;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                transform: `rotate(${rotation - 90}deg)`,
                transformOrigin: `${size / 2}px ${size / 2}px`
              }}
            />
          );
        })}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{totalUsers}</span>
        <span className="text-xs text-gray-500 font-medium">Total</span>
      </div>
    </div>
  );
}

export function UserStats() {
  const { stats, loading, error } = useUserStats();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showTooltip]);

  if (loading) {
    return (
      <div className="bg-foreground rounded-xl p-4 border border-gray-700/30 shadow-2xl w-full max-w-sm mx-auto">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-24 mb-4"></div>
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 bg-gray-700 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-foreground rounded-xl p-4 border border-gray-700/30 shadow-2xl w-full max-w-sm mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">User Stats</h3>
          <p className="text-gray-400 text-sm">Unable to load stats</p>
          {error && (
            <p className="text-red-400 text-xs mt-2">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-foreground rounded-xl p-4 border border-gray-700/30 shadow-2xl w-full max-w-sm mx-auto relative overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">User Stats</h3>
        <div className="relative" ref={tooltipRef}>
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-800/50"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {/* Tooltip - Positioned below the button, contained within stats area */}
          {showTooltip && (
            <div className="absolute right-0 top-8 w-56 bg-black border border-gray-600 rounded-lg p-3 shadow-2xl z-50">
              <div className="text-xs text-gray-200 leading-relaxed">
                These metrics contain user-specific data, reflecting the number of users and the average time they spend on the system.
              </div>
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Arrow pointing up */}
              <div className="absolute -top-1 right-4 w-2 h-2 bg-black border-l border-t border-gray-600 transform rotate-45"></div>
            </div>
          )}
        </div>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-4">
        <DonutChart
          totalUsers={stats.totalUsers}
          activeUsers={stats.activeUsers}
          newUsersToday={stats.newUsersToday}
          averageConnections={stats.averageConnectionsPerUser}
        />
      </div>

      {/* Stats List */}
      <div className="space-y-0">
        <StatItem
          label="Active users"
          value={stats.activeUsers}
          color="#36D136"
          showSeparator={true}
        />
        <StatItem
          label="New users today"
          value={stats.newUsersToday}
          color="#00CBF7"
          showSeparator={true}
        />
        <StatItem
          label="Average con. per user"
          value={Math.round(stats.averageConnectionsPerUser * 100) / 100}
          color="#C0F003"
          showSeparator={false}
        />
      </div>
    </div>
  );
}
