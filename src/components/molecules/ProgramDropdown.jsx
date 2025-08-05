import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import ApperIcon from "@/components/ApperIcon";
import { programService } from "@/services/api/programService";
import AddProgramModal from "@/components/molecules/AddProgramModal";

const ProgramDropdown = ({ isOpen, onClose }) => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { isAdmin } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      loadPrograms();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const loadPrograms = async () => {
    try {
      setIsLoading(true);
      const data = await programService.getAll();
      setPrograms(data);
    } catch (error) {
      console.error("Failed to load programs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgramAdded = () => {
    loadPrograms();
    setShowAddModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
          >
            {isLoading ? (
              <div className="px-4 py-8">
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            ) : (
              <>
                {programs.map((program) => (
                  <Link
                    key={program.Id}
                    to={`/program/${program.slug}`}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    onClick={onClose}
                  >
                    <div className="flex items-center">
                      <ApperIcon name="BookOpen" size={16} className="mr-3 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="font-medium">{program.title}</div>
                        {program.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {program.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                
                {programs.length === 0 && !isLoading && (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <ApperIcon name="BookOpen" size={24} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No programs available</p>
                  </div>
                )}
                
                {isAdmin && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="w-full px-4 py-3 text-left text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center"
                    >
                      <ApperIcon name="Plus" size={16} className="mr-3" />
                      Add Program
                    </button>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AddProgramModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onProgramAdded={handleProgramAdded}
      />
    </>
  );
};

export default ProgramDropdown;