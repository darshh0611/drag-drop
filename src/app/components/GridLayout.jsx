"use client";

import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

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

const WidgetContent = ({ type, id, onDelete }) => {
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
    <div className="w-full h-full flex flex-col">
      <div className="bg-gray-100 px-3 py-2 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Widget {id}</h3>
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

export default function Dashboard() {
  const [layouts, setLayouts] = useState(DEFAULT_LAYOUTS);
  const [widgets, setWidgets] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    try {
      const savedLayouts = localStorage.getItem("dashboardLayouts");
      const savedWidgets = localStorage.getItem("dashboardWidgets");
      const savedNextId = localStorage.getItem("dashboardNextId");

      if (savedLayouts && savedWidgets) {
        setLayouts(JSON.parse(savedLayouts));
        setWidgets(JSON.parse(savedWidgets));
        setNextId(savedNextId ? parseInt(savedNextId) : 1);
      }
    } catch (error) {
      console.error("Error loading saved dashboard state:", error);
      setWidgets([]);
      setNextId(1);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("dashboardLayouts", JSON.stringify(layouts));
      localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
      localStorage.setItem("dashboardNextId", nextId.toString());
    }
  }, [layouts, widgets, nextId, isClient]);

  // Handle layout changes
  const handleLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts);
  };

  // Add a new widget
  const addWidget = (type) => {
    const newId = nextId.toString();
    const newWidget = { id: newId, type };

    setWidgets([...widgets, newWidget]);
    setNextId(nextId + 1);

    const newLayouts = { ...layouts };
    const baseLayout = { i: newId, x: 0, y: Infinity, type }; // Place at the bottom

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
  };

  const removeWidget = (id) => {
    // First update the widgets state
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

    // Force cleanup localStorage
    const cleanupTimer = setTimeout(() => {
      localStorage.setItem(
        "dashboardWidgets",
        JSON.stringify(widgets.filter((widget) => widget.id !== id))
      );
      localStorage.setItem(
        "dashboardLayouts",
        JSON.stringify(
          Object.fromEntries(
            Object.entries(layouts).map(([key, value]) => [
              key,
              value.filter((item) => item.i !== id),
            ])
          )
        )
      );
    }, 0);

    return () => clearTimeout(cleanupTimer);
  };
  if (!isClient) {
    return <div className="container mx-auto p-4">Loading dashboard...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          onClick={() => {
            localStorage.removeItem("dashboardLayouts");
            localStorage.removeItem("dashboardWidgets");
            localStorage.removeItem("dashboardNextId");
            setLayouts(DEFAULT_LAYOUTS);
            setWidgets([]);
            setNextId(1);
          }}
        >
          Reset Dashboard
        </button>
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
        {widgets.length === 0 ? (
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
            // Show grid lines during drag or resize
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
                  onDelete={removeWidget}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </div>
    </div>
  );
}
