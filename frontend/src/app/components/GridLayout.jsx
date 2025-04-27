"use client";

import React, { useState, useEffect, useRef } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import axios from "axios";

const ResponsiveGridLayout = WidthProvider(Responsive);
const API_BASE_URL = "http://localhost:4444/api";

const WIDGET_TYPES = {
  CHART: "chart",
  TABLE: "table",
  METRIC: "metric",
  TEXT: "text",
  FILTER: "filter",
};

const DEFAULT_LAYOUTS = {
  lg: [],
  md: [],
  sm: [],
};

// Widget component remains the same as your original code
const WidgetContent = ({ type, id, widgetName, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(widgetName || type);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // optional: select the whole text
    }
  }, [isEditing]);

  useEffect(() => {
    setEditName(widgetName || type);
  }, [widgetName, type]);

  const handleRename = () => {
    if (editName.trim()) {
      onRename(id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    setEditName(e.target.value);
  };

  const getWidgetContent = () => {
    switch (type) {
      case WIDGET_TYPES.CHART:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-2">Chart Widget</div>
              <div className="w-32 h-24 mx-auto bg-blue-100 rounded flex items-center justify-center">
                <div className="text-blue-500">Chart Placeholder</div>
              </div>
            </div>
          </div>
        );
      case WIDGET_TYPES.TABLE:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="w-full px-4">
              <div className="text-gray-400 mb-2">Table Widget</div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-100">
                      ID
                    </th>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-100">
                      Name
                    </th>
                    <th className="border border-gray-300 px-2 py-1 bg-gray-100">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">1</td>
                    <td className="border border-gray-300 px-2 py-1">Item A</td>
                    <td className="border border-gray-300 px-2 py-1">100</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1">2</td>
                    <td className="border border-gray-300 px-2 py-1">Item B</td>
                    <td className="border border-gray-300 px-2 py-1">200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case WIDGET_TYPES.METRIC:
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="text-gray-400 mb-1">Metric Widget</div>
            <div className="text-3xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-gray-500">Total Count</div>
          </div>
        );
      case WIDGET_TYPES.TEXT:
        return (
          <div className="h-full flex flex-col p-4">
            <div className="text-gray-400 mb-2">Text Widget</div>
            <p className="text-gray-600">
              This is a sample text widget that can contain informational
              content or instructions.
            </p>
          </div>
        );
      case WIDGET_TYPES.FILTER:
        return (
          <div className="h-full flex flex-col p-4">
            <div className="text-gray-400 mb-2">Filter Widget</div>
            <div className="flex flex-col space-y-2">
              <select className="border rounded px-2 py-1">
                <option>All Categories</option>
                <option>Category A</option>
                <option>Category B</option>
              </select>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                  Apply
                </button>
                <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                  Reset
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-gray-500">Widget Content</div>;
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col"
    >
      <div className="bg-gray-100 px-3 py-2 border-b flex justify-between items-center">
        {isEditing ? (
          <div className="flex items-center gap-2 text-amber-300">
            <input
              ref={inputRef}
              type="text"
              value={editName}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditName(widgetName || type);
                }
              }}
              className="px-2 py-1 text-sm border rounded"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-700">
              {widgetName || type}
            </h3>
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="text-gray-400 hover:text-blue-500"
            >
              <div className="border stroke-lime-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </button>
          </div>
        )}
        <button
          className="text-gray-400 hover:text-red-500"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(id);
          }}
          aria-label="Delete widget"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-grow overflow-auto bg-white p-2">
        {getWidgetContent()}
      </div>
    </div>
  );
};

// Dashboard List Component
const DashboardList = ({
  dashboards,
  currentDashboardId,
  onSelect,
  onNew,
  onDelete,
  onRename,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const handleRename = (id) => {
    if (newName.trim()) {
      onRename(id, newName);
      setEditingId(null);
      setNewName("");
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Dashboards</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          onClick={onNew}
        >
          New Dashboard
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        {dashboards.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">
            No dashboards yet. Create one to get started!
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {dashboards.map((dashboard) => (
              <li
                key={dashboard.id}
                className={`p-3 flex justify-between items-center ${
                  dashboard.id === currentDashboardId ? "bg-blue-50" : ""
                }`}
              >
                {editingId === dashboard.id ? (
                  <div className="flex flex-grow mr-2">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 flex-grow"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleRename(dashboard.id)
                      }
                      autoFocus
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => handleRename(dashboard.id)}
                    >
                      Save
                    </button>
                    <button
                      className="ml-2 bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm"
                      onClick={() => {
                        setEditingId(null);
                        setNewName("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className="cursor-pointer flex-grow text-red-500"
                      onClick={() => onSelect(dashboard.id)}
                    >
                      {dashboard.name}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => {
                          setEditingId(dashboard.id);
                          setNewName(dashboard.name);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => onDelete(dashboard.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default function DashboardApp() {
  const [dashboards, setDashboards] = useState([]);
  const [currentDashboardId, setCurrentDashboardId] = useState(null);
  const [layouts, setLayouts] = useState(DEFAULT_LAYOUTS);
  const [widgets, setWidgets] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [dashboardName, setDashboardName] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load dashboards from API
  useEffect(() => {
    setIsClient(true);

    const fetchDashboards = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/dashboards`);
        setDashboards(response.data);

        console.log("Fetched dashboards:", response);

        // Select the first dashboard if available
        if (response.data.length > 0 && !currentDashboardId) {
          setCurrentDashboardId(response.data[0].id);
          setDashboardName(response.data[0].name);
          setLayouts(response.data[0].layouts);
          setWidgets(response.data[0].widget);
          setNextId(response.data[0].nextId);
        }

        setIsLoading(false);
        setIsFirstLoad(false);
      } catch (err) {
        console.error("Failed to fetch dashboards:", err);

        // Instead of showing an error when no dashboards exist yet,
        // we'll just set empty state and allow user to create new dashboards
        if (err.response && err.response.status === 404) {
          setDashboards([]);
          setIsLoading(false);
          setIsFirstLoad(false);
        } else {
          setError(
            "Failed to connect to the dashboard service. Please try again later."
          );
          setIsLoading(false);
        }
      }
    };

    fetchDashboards();
  }, []);

  // Save dashboard changes
  const saveDashboard = async (manual = false) => {
    if (!currentDashboardId) return;

    try {
      if (manual) setIsSaving(true);

      await axios.put(`${API_BASE_URL}/dashboards/${currentDashboardId}`, {
        name: dashboardName,
        layouts,
        widgets,
        nextId,
      });

      // Update local state
      setDashboards((prevDashboards) =>
        prevDashboards.map((dashboard) =>
          dashboard.id === currentDashboardId
            ? {
                ...dashboard,
                name: dashboardName,
                layouts,
                widgets,
                nextId,
                updatedAt: new Date().toISOString(),
              }
            : dashboard
        )
      );

      if (manual) {
        // Show success feedback for manual saves
        alert("Dashboard saved successfully!");
      }
    } catch (err) {
      console.error("Failed to save dashboard:", err);
      setError("Failed to save dashboard. Please try again later.");
    } finally {
      if (manual) setIsSaving(false);
    }
  };

  // Auto-save when layouts or widgets change
  useEffect(() => {
    if (currentDashboardId && isClient && !isLoading) {
      const saveTimeout = setTimeout(() => {
        saveDashboard();
      }, 1000); // Debounce save for 1 second

      return () => clearTimeout(saveTimeout);
    }
  }, [layouts, widgets, nextId, currentDashboardId, dashboardName]);

  // Handle layout changes
  const handleLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts);
  };

  // Select a dashboard
  const selectDashboard = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboards/${id}`);
      console.log("Selected dashboard:", response);
      const dashboard = response.data;

      setCurrentDashboardId(dashboard.id);
      setDashboardName(dashboard.name);
      setLayouts(dashboard.layouts || DEFAULT_LAYOUTS);
      setWidgets(dashboard.widgets || []);
      setNextId(dashboard.nextId || 1);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
      setError("Failed to load dashboard. Please try again later.");
    }
  };

  // Create a new dashboard
  const createDashboard = async () => {
    try {
      const newName = prompt("Enter dashboard name:", "New Dashboard");
      if (!newName) return;

      const response = await axios.post(`${API_BASE_URL}/dashboards`, {
        name: newName,
        layouts: DEFAULT_LAYOUTS,
        widgets: [],
        nextId: 1,
      });

      const newDashboard = response.data;
      setDashboards([...dashboards, newDashboard]);
      setCurrentDashboardId(newDashboard.id);
      setDashboardName(newDashboard.name);
      setLayouts(newDashboard.layouts);
      setWidgets(newDashboard.widgets || []);
      setNextId(newDashboard.nextId);

      // Clear any existing errors since we successfully created a dashboard
      setError(null);
    } catch (err) {
      console.error("Failed to create dashboard:", err);
      setError("Failed to create dashboard. Please try again later.");
    }
  };

  // Delete a dashboard
  const deleteDashboard = async (id) => {
    if (!confirm("Are you sure you want to delete this dashboard?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/dashboards/${id}`);

      const updatedDashboards = dashboards.filter((d) => d.id !== id);
      setDashboards(updatedDashboards);

      // If we deleted the current dashboard, select another one
      if (id === currentDashboardId) {
        if (updatedDashboards.length > 0) {
          selectDashboard(updatedDashboards[0].id);
        } else {
          setCurrentDashboardId(null);
          setDashboardName("");
          setLayouts(DEFAULT_LAYOUTS);
          setWidgets([]);
          setNextId(1);
        }
      }
    } catch (err) {
      console.error("Failed to delete dashboard:", err);
      setError("Failed to delete dashboard. Please try again later.");
    }
  };

  // Rename a dashboard
  const renameDashboard = async (id, newName) => {
    try {
      const dashboard = dashboards.find((d) => d.id === id);
      await axios.put(`${API_BASE_URL}/dashboards/${id}`, {
        ...dashboard,
        name: newName,
      });

      setDashboards((prevDashboards) =>
        prevDashboards.map((dashboard) =>
          dashboard.id === id ? { ...dashboard, name: newName } : dashboard
        )
      );

      if (id === currentDashboardId) {
        setDashboardName(newName);
      }
    } catch (err) {
      console.error("Failed to rename dashboard:", err);
      setError("Failed to rename dashboard. Please try again later.");
    }
  };

  // Add a new widget
  const addWidget = async (type) => {
    if (!currentDashboardId) {
      alert("Please create or select a dashboard first");
      return;
    }

    try {
      // First create the widget in the backend
      const response = await axios.post(
        `${API_BASE_URL}/dashboards/${currentDashboardId}/widgets`,
        {
          type,
          widget_id: nextId.toString(),
          name: type,
        }
      );

      console.log("Widget created:", response);

      const newWidget = {
        id: nextId.toString(),
        type,
        name: type,
      };

      // Update local state
      setWidgets([...(widgets || []), newWidget]);
      setNextId(nextId + 1);

      const newLayouts = { ...layouts };
      const baseLayout = { i: newWidget.id, x: 0, y: Infinity, type }; // Place at the bottom

      switch (type) {
        case WIDGET_TYPES.CHART:
          baseLayout.w = 2;
          baseLayout.h = 2;
          break;
        case WIDGET_TYPES.TABLE:
          baseLayout.w = 3;
          baseLayout.h = 2;
          break;
        case WIDGET_TYPES.METRIC:
          baseLayout.w = 1;
          baseLayout.h = 1;
          break;
        case WIDGET_TYPES.TEXT:
          baseLayout.w = 2;
          baseLayout.h = 1;
          break;
        case WIDGET_TYPES.FILTER:
          baseLayout.w = 1;
          baseLayout.h = 2;
          break;
        default:
          baseLayout.w = 1;
          baseLayout.h = 1;
      }

      Object.keys(newLayouts).forEach((breakpoint) => {
        newLayouts[breakpoint] = [
          ...(newLayouts[breakpoint] || []),
          { ...baseLayout },
        ];
      });

      setLayouts(newLayouts);
    } catch (error) {
      console.error("Failed to add widget:", error);
      alert("Failed to add widget. Please try again.");
    }
  };

  // Remove a widget
  const removeWidget = (id) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );

    setLayouts((prevLayouts) => {
      const updatedLayouts = {};
      Object.keys(prevLayouts).forEach((breakpoint) => {
        if (prevLayouts[breakpoint]) {
          updatedLayouts[breakpoint] = prevLayouts[breakpoint].filter(
            (item) => item.i !== id
          );
        }
      });
      return updatedLayouts;
    });
  };

  const renameWidget = async (widgetId, newName) => {
    console.log("Renaming widget:", widgetId, newName);
    try {
      // Update widget name in the backend
      const response = await axios.put(
        `${API_BASE_URL}/dashboards/${currentDashboardId}/widgets/${widgetId}`,
        {
          name: newName,
        }
      );

      console.log("Widget renamed:", response);

      // Update local state
      setWidgets((prevWidgets) =>
        prevWidgets.map((widget) =>
          widget.id === widgetId ? { ...widget, name: newName } : widget
        )
      );
    } catch (error) {
      console.error("Failed to rename widget:", error);
      alert("Failed to rename widget. Please try again.");
    }
  };

  if (!isClient) {
    return <div className="container mx-auto p-4">Loading dashboard...</div>;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4">Loading dashboards...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show a special error UI only for connectivity errors,
  // not for the "no dashboards" case
  if (error && !isFirstLoad) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Manager</h1>

      <DashboardList
        dashboards={dashboards}
        currentDashboardId={currentDashboardId}
        onSelect={selectDashboard}
        onNew={createDashboard}
        onDelete={deleteDashboard}
        onRename={renameDashboard}
      />

      {currentDashboardId ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-bold mr-2">{dashboardName}</h2>
              <button
                className="text-gray-500 hover:text-blue-500"
                onClick={() => {
                  const newName = prompt(
                    "Enter new dashboard name:",
                    dashboardName
                  );
                  if (newName) {
                    setDashboardName(newName);
                    renameDashboard(currentDashboardId, newName);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex gap-2">
              {" "}
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center ${
                  isSaving ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={() => saveDashboard(true)}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Dashboard"
                )}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to reset this dashboard?")
                  ) {
                    setLayouts(DEFAULT_LAYOUTS);
                    setWidgets([]);
                    setNextId(1);
                  }
                }}
              >
                Reset Dashboard
              </button>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => addWidget(WIDGET_TYPES.CHART)}
            >
              Add Chart
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => addWidget(WIDGET_TYPES.TABLE)}
            >
              Add Table
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => addWidget(WIDGET_TYPES.METRIC)}
            >
              Add Metric
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => addWidget(WIDGET_TYPES.TEXT)}
            >
              Add Text
            </button>
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm"
              onClick={() => addWidget(WIDGET_TYPES.FILTER)}
            >
              Add Filter
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-screen">
            {(widgets || []).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="mb-4">No widgets added yet</p>
                <p className="text-sm">
                  Use the buttons above to add widgets to your dashboard
                </p>
              </div>
            ) : (
              <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={100}
                onLayoutChange={handleLayoutChange}
                isDraggable={true}
                isResizable={true}
                margin={[12, 12]}
                containerPadding={[0, 0]}
                useCSSTransforms={true}
                draggableHandle=".bg-gray-100"
              >
                {widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="shadow bg-white rounded overflow-hidden border border-gray-200"
                  >
                    <WidgetContent
                      id={widget.id}
                      type={widget.type}
                      widgetName={widget.name}
                      onDelete={removeWidget}
                      onRename={renameWidget}
                    />
                  </div>
                ))}
              </ResponsiveGridLayout>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
          <p className="mb-4 text-gray-500">No dashboard selected</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
            onClick={createDashboard}
          >
            Create Your First Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
