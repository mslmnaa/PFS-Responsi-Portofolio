import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// Sample skills data
const initialSkills = [
  { id: 1, name: "React", level: 90 },
  { id: 2, name: "TypeScript", level: 85 },
  { id: 3, name: "Node.js", level: 80 },
 ];

function SkillsSection({ isDarkMode }) {
  const [skills, setSkills] = useState(initialSkills);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const addSkill = () => {
    if (newSkill.name.trim() !== "") {
      setSkills([...skills, { ...newSkill, id: Date.now() }]);
      setNewSkill({ name: "", level: 50 });
    }
  };

  const updateSkill = (id, updatedSkill) => {
    setSkills(skills.map((skill) => (skill.id === id ? updatedSkill : skill)));
    setEditingSkill(null);
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <motion.section
      ref={ref}
      className={`
        min-h-screen w-screen flex flex-col justify-start items-center 
        py-8 px-4 relative overflow-hidden
        ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
        }
      `}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        className="container mx-auto h-full flex flex-col px-4 sm:px-6 lg:px-8 max-w-7xl"
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold mb-6 text-center"
          variants={itemVariants}
        >
          My <span className="text-blue-500">Skills</span>
        </motion.h2>

        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          variants={containerVariants}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className={`
                p-4 rounded-xl shadow-lg
                ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }
              `}
              variants={itemVariants}
            >
              {editingSkill === skill.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateSkill(skill.id, {
                      ...skill,
                      name: e.target.name.value,
                      level: parseInt(e.target.level.value),
                    });
                  }}
                  className="flex flex-col gap-2 sm:flex-row sm:items-end"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      name="name"
                      defaultValue={skill.name}
                      className={`p-2 rounded-md w-full ${
                        isDarkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="range"
                      name="level"
                      min="0"
                      max="100"
                      defaultValue={skill.level}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2 sm:mt-0">
                    <motion.button
                      type="submit"
                      className="px-3 py-1 bg-green-500 text-white rounded-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setEditingSkill(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span
                          className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                            isDarkMode
                              ? "text-blue-200 bg-blue-900"
                              : "text-blue-600 bg-blue-200"
                          }`}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${
                        isDarkMode ? "bg-blue-900" : "bg-blue-200"
                      }`}
                    >
                      <div
                        style={{ width: `${skill.level}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <motion.button
                      onClick={() => setEditingSkill(skill.id)}
                      className={`p-2 rounded-full ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit className="text-blue-500" />
                    </motion.button>
                    <motion.button
                      onClick={() => deleteSkill(skill.id)}
                      className={`p-2 rounded-full ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash className="text-red-500" />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={`p-4 rounded-xl shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addSkill();
            }}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="Skill name"
                className={`p-2 rounded-md w-full ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={newSkill.level}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, level: parseInt(e.target.value) })
                  }
                  min="0"
                  max="100"
                  className="w-full"
                />
                <span
                  className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                    isDarkMode
                      ? "text-blue-200 bg-blue-900"
                      : "text-blue-600 bg-blue-200"
                  }`}
                >
                  {newSkill.level}%
                </span>
              </div>
            </div>
            <motion.button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center gap-2 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus />
              Add Skill
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default SkillsSection;

