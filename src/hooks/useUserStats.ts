'use client';

import { useState, useEffect } from 'react';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  averageConnectionsPerUser: number;
}

interface UseUserStatsReturn {
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUserStats(): UseUserStatsReturn {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/v1/users/stats');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch stats');
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Fallback data for development
      setStats({
        totalUsers: 0,
        activeUsers: 0,
        newUsersToday: 0,
        averageConnectionsPerUser: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refetch = () => {
    fetchStats();
  };

  return {
    stats,
    loading,
    error,
    refetch
  };
}
