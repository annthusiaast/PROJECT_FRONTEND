import { ShieldUser, FileText, Archive, FolderKanban, } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, } from "recharts";
import { useNavigate } from "react-router-dom";
import user1 from "@/assets/Joseph_prof.png";
import user2 from "@/assets/Joseph_prof.png";
import user3 from "@/assets/Joseph_prof.png";

const initialUsers = [
  {
    user: "Sarah Wilson",
    action: "Logged out 2 minutes ago",
    status: "Inactive",
    date: "April 21, 2025 ",
    image: user1,
  },
  {
    user: "Bryan Wilson",
    action: "Logged in 5 minutes ago",
    status: "Active",
    date: "April 21, 2025 ",
    image: user2,
  },
  {
    user: "John Wilson",
    action: "Logged in 10 minutes ago",
    status: "Active",
    date: "April 21, 2025 ",
    image: user3,
  },
];

const data = [
  { name: "Mon", Cases: 400, analytics: 240 },
  { name: "Tue", Cases: 300, analytics: 139 },
  { name: "Wed", Cases: 200, analytics: 980 },
  { name: "Thu", Cases: 278, analytics: 390 },
  { name: "Fri", Cases: 189, analytics: 480 },
  { name: "Sat", Cases: 239, analytics: 380 },
  { name: "Sun", Cases: 349, analytics: 430 },
];

const StatCard = ({ title, value, icon }) => (
  <div className="flex flex-col justify-between gap-2 rounded-lg bg-white p-4 shadow dark:bg-slate-900">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
      {value}
    </h3>
  </div>
);

const ChartPlaceholder = ({ title, dataKey }) => (
  <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow dark:bg-slate-900">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
      {title}
    </h3>
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#3b82f6"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorData)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Reports & Analytics
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Users"
          value="1,482"
          icon={<ShieldUser size={20} className="text-blue-500" />}
        />
        <StatCard
          title="Archived Cases"
          value="267"
          icon={<Archive size={20} className="text-green-500" />}
        />
        <StatCard
          title="Processing Cases"
          value="24"
          icon={<FolderKanban size={20} className="text-orange-500" />}
        />
        <StatCard
          title="Processing Documents"
          value="3,642"
          icon={<FileText size={20} className="text-purple-500" />}
        />
      </div>

      <div className="relative rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md">
        <span className="absolute top-4 right-4 z-10 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          Last 7 Days
        </span>

        <div className="grid grid-cols-4 gap-6 lg:grid-cols-1">
          <ChartPlaceholder title="Completed Cases" dataKey="Cases" />
        </div>
      </div>

      <div className="card ">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            User Activity
          </h2>
          <button
            onClick={() => navigate("/user-logs")}
            className="text-blue-800 font-bold hover:underline text-xl"
          >
            View all
          </button>
        </div>

        <table className="w-full text-sm border-t">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-2">USER</th>
              <th className="p-2">ACTION</th>
              <th className="p-2">STATUS</th>
              <th className="p-2">DATE</th>
            </tr>
          </thead>
          <tbody>
            {initialUsers.map((item, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="flex items-center gap-2 p-2">
                  <img
                    src={item.image}
                    alt={item.user}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-slate-900 dark:text-white">
                    {item.user}
                  </span>
                </td>
                <td className="p-2 text-slate-700 dark:text-slate-300">
                  {item.action}
                </td>
                <td
                  className={`p-2 font-medium ${item.status.toLowerCase() === "active"
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                >
                  {item.status}
                </td>
                <td className="p-2 text-slate-700 dark:text-slate-300">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Reports;
