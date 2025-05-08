import React from "react";

export const Footer = () => {
  return (
    <footer className="flex border-t items-center justify-between font-medium p-6">
      <div className="flex items-center gap-2">
        <p className="text-green-800 text-lg font-bold">
          Edu<span className="text-yellow-500">pay,</span> Inc.
        </p>
      </div>
      <div className="flex text-xs items-center gap-2">
        <p>&copy; 2025 Edupay. All rights reserved.</p>
      </div>
    </footer>
  );
};
