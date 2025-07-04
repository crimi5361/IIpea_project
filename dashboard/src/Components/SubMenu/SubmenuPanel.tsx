import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SubMenuPanelProps {
  position: { top: number; left: number };
  data: {
    title: string;
    subItems: { label: string; path: string }[];
  };
  onClose: () => void;
  onSubItemClick: (path: string) => void;
}

const SubMenuPanel: React.FC<SubMenuPanelProps> = ({
  position,
  data,
  onClose,
  onSubItemClick,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useLayoutEffect(() => {
    const panelHeight = panelRef.current?.offsetHeight || 300;
    const panelWidth = panelRef.current?.offsetWidth || 300;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const newTop =
      position.top + panelHeight > viewportHeight
        ? Math.max(viewportHeight - panelHeight - 20, 10)
        : position.top;

    const newLeft =
      position.left + panelWidth > viewportWidth
        ? Math.max(viewportWidth - panelWidth - 20, 10)
        : position.left;

    setAdjustedPosition({ top: newTop, left: newLeft });
  }, [position]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed z-50 w-72 max-h-[80vh] overflow-y-auto p-5 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/80 border border-gray-200"
        style={{
          top: adjustedPosition.top,
          left: adjustedPosition.left,
        }}
      >
        <h3 className="text-base font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3 tracking-wide uppercase">
          {data.title}
        </h3>

        <ul className="space-y-2">
          {data.subItems.map((item, index) => (
            <li
              key={index}
              onClick={() => onSubItemClick(item.path)}
              className="flex items-center justify-between px-4 py-2 bg-blue-50 hover:bg-blue-100 hover:scale-[1.02] transition-all 
              duration-200 ease-in-out rounded-lg cursor-pointer text-sm 
              text-gray-800 font-medium shadow-sm hover:shadow-md"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-blue-500" />
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubMenuPanel;
