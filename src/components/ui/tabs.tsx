import React, { useState } from "react";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode | (() => React.ReactNode);
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Triggers */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-2 px-4 -mb-px text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.value
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 border rounded-b-md">
        {tabs.map(
          (tab) =>
            activeTab === tab.value && (
              <div key={tab.value}>
                {typeof tab.content === "function"
                  ? tab.content()
                  : tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
