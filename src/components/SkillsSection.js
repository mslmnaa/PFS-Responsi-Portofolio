import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { 
  Bootstrap, 
  Braces, 
  FileEarmark, 
  Database, 
  Globe,
  QuestionCircle
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample skills data
const initialSkills = [
  { id: 1, name: "React", level: 90, icon: Bootstrap },
  { id: 2, name: "TypeScript", level: 85, icon: Braces },
  { id: 3, name: "Node.js", level: 80, icon: FileEarmark },
  // { id: 4, name: "SQL", level: 75, icon: Database },
  // { id: 5, name: "HTML/CSS", level: 95, icon: Globe },
];

// Status color mapping
const statusColors = {
  "Completed": "bg-green-100 text-green-800",
  "Live": "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800"
};

function SkillsSection({ isDarkMode }) {
  const [skills, setSkills] = useState(initialSkills);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: "", level: 50, icon: QuestionCircle });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

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
      setNewSkill({ name: "", level: 50, icon: QuestionCircle });
      showAlertMessage("Skill added successfully!", "success");
    }
  };

  const updateSkill = (id, updatedSkill) => {
    setSkills(skills.map((skill) => (skill.id === id ? updatedSkill : skill)));
    setEditingSkill(null);
    showAlertMessage("Skill updated successfully!", "success");
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
    setShowDeleteModal(false);
    showAlertMessage("Skill deleted successfully!", "success");
  };

  const showDeleteConfirmation = (skill) => {
    setSkillToDelete(skill);
    setShowDeleteModal(true);
  };

  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
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

        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full mb-4"
            >
              <Alert variant={alertVariant}>{alertMessage}</Alert>
            </motion.div>
          )}
        </AnimatePresence>

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
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateSkill(skill.id, {
                      ...skill,
                      name: e.target.name.value,
                      level: parseInt(e.target.level.value),
                    });
                  }}
                  className="flex flex-col gap-2"
                >
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="name"
                      defaultValue={skill.name}
                      className={`p-2 rounded-md w-full ${
                        isDarkMode
                          ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          : "bg-white text-gray-900 border-gray-300 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      }`}
                    />
                  </Form.Group>
                  <Form.Group className="flex-1 flex flex-col">
                    <Form.Label className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Skill Level: {skill.level}%
                    </Form.Label>
                    <Form.Control
                      type="range"
                      name="level"
                      min="0"
                      max="100"
                      defaultValue={skill.level}
                      className={`w-full ${
                        isDarkMode
                          ? "accent-blue-500 bg-gray-700"
                          : "accent-blue-600 bg-gray-100"
                      }`}
                    />
                  </Form.Group>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="success" type="submit" size="sm">
                      Save
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setEditingSkill(null)}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <div className="flex items-center mb-2">
                    <skill.icon className={`w-6 h-6 mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                  </div>
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
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setEditingSkill(skill.id)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => showDeleteConfirmation(skill)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={`p-6 rounded-xl shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addSkill();
            }}
            className="flex flex-col gap-4"
          >
            <Form.Group>
              <Form.Label>Skill Name</Form.Label>
              <Form.Control
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="Enter skill name"
                className={`p-2 rounded-md w-full ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                }`}
              />
            </Form.Group>
            <Form.Group className="flex-1 flex flex-col">
              <Form.Label className={`mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Skill Level: {newSkill.level}%
              </Form.Label>
              <Form.Control
                type="range"
                value={newSkill.level}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, level: parseInt(e.target.value) })
                }
                min="0"
                max="100"
                className={`w-full ${
                  isDarkMode
                    ? "accent-blue-500 bg-gray-700"
                    : "accent-blue-600 bg-gray-100"
                }`}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className={`w-full sm:w-auto px-4 py-2 ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-all duration-300 rounded-md`}
            >
              <FaPlus className="mr-2 inline" />
              Add Skill
            </Button>
          </Form>
        </motion.div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the skill "{skillToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteSkill(skillToDelete?.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.section>
  );
}

export default SkillsSection;

