// src/pages/dashboard/index.tsx
import { useEffect, useState } from "react";
import { taskService } from "../../services/taskService/TaskService";
import StatCard from "../../components/dashboard/StatCard";
import ButtonLayout from "../../components/common/ButtonLayout";
import { useNavigate } from "react-router-dom";
import { statsConfig } from "../../data/Data";
import Loading from "../../components/loading/Loading";

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgress: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loadStats = async () => {
    try {
      const response = await taskService.dashboardStats();
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadStats();
  }, []);

  if (loading)
    return (
      <div className="p-6">
        <Loading />{" "}
      </div>
    );
  if (!stats)
    return <div className="p-6 text-red-500">Failed to load dashboard.</div>;

  return (
    <div className="container mt-4 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <ButtonLayout variant="primary" onClick={() => navigate("/tasks")}>
          View / Create Tasks
        </ButtonLayout>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(statsConfig).map(([key, cfg]) => (
          <StatCard
            key={key}
            title={cfg.title}
            value={stats[key as keyof DashboardStats]}
            bg={cfg.bg}
            border={cfg.border}
            text={cfg.text}
          />
        ))}
      </div>
    </div>
  );
}
