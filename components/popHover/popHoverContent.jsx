// popHoverContent.js
import React from "react";

export function popoverContent(actionMenu, record) {
  return (
    <div className="flex flex-col bg-white border-[#e0dede96] border rounded shadow-md min-w-[160px] p-2">
      {actionMenu.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 px-4 py-2 text-sm  hover:bg-gray-100 transition-colors cursor-pointer ${
            item.heading === "Delete"
              ? "text-red-600 hover:text-white hover:!bg-red-600"
              : " hover:bg-gray-100 text-gray-800"
          }`}
          onClick={() => item.handleFunction(record)}
        >
          {item.icon}
          <p>{item.heading}</p>
        </div>
      ))}
    </div>
  );
}
