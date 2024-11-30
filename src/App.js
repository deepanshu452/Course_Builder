import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ModuleCard from './components/ModuleCard';
import NavBar from './components/NavBar';

function App() {
  const [CourseModules, setCourseModules] = useState([]);

  useEffect(() => {
    const savedCourseModules = JSON.parse(localStorage.getItem('CourseModules'));
    if (savedCourseModules) {
      setCourseModules(savedCourseModules);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('CourseModules', JSON.stringify(CourseModules));
  }, [CourseModules]);

  const addModule = () => {
    const newModule = { id: Date.now(), name: 'New Module', resources: [] };
    setCourseModules([...CourseModules, newModule]);
  };

  const addCourseResources = (moduleId, resource) => {
    setCourseModules(CourseModules.map(m =>
      m.id === moduleId ? { ...m, resources: [...m.resources, resource] } : m
    ));
  };

  const deleteModule = (moduleId) => {
    setCourseModules(CourseModules.filter(m => m.id !== moduleId));
  };

  const moveModule = (draggedId, targetId) => {
    const draggedIndex = CourseModules.findIndex(m => m.id === draggedId);
    const targetIndex = CourseModules.findIndex(m => m.id === targetId);
    const updatedCourseModules = Array.from(CourseModules);
    const [draggedModule] = updatedCourseModules.splice(draggedIndex, 1);
    updatedCourseModules.splice(targetIndex, 0, draggedModule);
    setCourseModules(updatedCourseModules);
  };

  const moveResource = (draggedModuleId, targetModuleId, draggedResourceId, targetResourceId) => {
    const sourceModuleIndex = CourseModules.findIndex(m => m.id === draggedModuleId);
    const targetModuleIndex = CourseModules.findIndex(m => m.id === targetModuleId);

    const sourceModule = CourseModules[sourceModuleIndex];
    const targetModule = CourseModules[targetModuleIndex];

    const draggedResourceIndex = sourceModule.resources.findIndex(r => r.id === draggedResourceId);
    const targetResourceIndex = targetModule.resources.findIndex(r => r.id === targetResourceId);

    const [draggedResource] = sourceModule.resources.splice(draggedResourceIndex, 1);
    targetModule.resources.splice(targetResourceIndex, 0, draggedResource);

    const updatedCourseModules = Array.from(CourseModules);
    updatedCourseModules[sourceModuleIndex] = sourceModule;
    updatedCourseModules[targetModuleIndex] = targetModule;

    setCourseModules(updatedCourseModules);
  };

  const deleteResource = (moduleId, resourceId) => {
    setCourseModules(CourseModules.map(m =>
      m.id === moduleId ? { ...m, resources: m.resources.filter(r => r.id !== resourceId) } : m
    ));
  };

  const handleFileUpload = (moduleId, file) => {
    const resource = { id: Date.now(), name: file.name, url: URL.createObjectURL(file) };
    addCourseResources(moduleId, resource);
  };

  return (
    <>
    <NavBar/><br/><br/><br/>
    <div className="text-white text-4xl mx-10 p-3"> Courses </div>
    <div className="fixed bottom-0 right-0 m-7 p-4">    
      <button on onClick={addModule} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700">
           Add Module</button>
    </div>
    <DndProvider backend={HTML5Backend}>
     
      <div className="flex flex-wrap m-3 p-5">
        {CourseModules.map(coursemodule => (
            <div className="grow m-3 p-1">
              <ModuleCard
                key={coursemodule.id}
                module={coursemodule}
                addCourseResources={addCourseResources}
                deleteCourseModule={deleteModule}
                moveCourseModule={moveModule}
                moveCourseResource={moveResource}
                deleteCourseResource={deleteResource}
                handleFileUpload={handleFileUpload}
              />
            </div>
        ))}
        </div>
        
      
    </DndProvider>
    </>
  );
}

export default App;
