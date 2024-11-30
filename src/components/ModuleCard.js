import React from 'react'
import { useDrag, useDrop } from 'react-dnd';
import Resource from './Resource';
import { FaTrash } from 'react-icons/fa';

const ModuleCard = ({ module, addCourseResources, deleteCourseModule, moveCourseModule, moveCourseResource, deleteCourseResource, handleFileUpload }) => {

    const [, ref] = useDrop({
        accept: 'MODULE',
        hover(card) {
          if (card.id !== module.id) {
            moveCourseModule(card.id, module.id);
            card.id = module.id;
          }
        },
      });
    
      const [{ isDragging }, drag] = useDrag({
        type: 'MODULE',
        card: { id: module.id },
        collect: (view) => ({
          isDragging: view.isDragging(),
        }),
      });
    
      const handleaddCourseResource = (type) => {
        if (type === 'link') {
          const url = prompt('Enter the link URL:');
          if (url) {
            const resource = { id: Date.now(), name: 'Link', type: 'link', url };
            addCourseResources(module.id, resource);
          }
        } else {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = type === 'image' ? 'image/*' : '.pdf';
          fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
              handleFileUpload(module.id, file);
            }
          };
          fileInput.click();
        }
      };

  return (
    <>
    <div ref={(node) => drag(ref(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
    {/* <div class="w-[calc(100%-10px)] mx-auto p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
    <div class="max-w-full p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{module.name}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">About the module and it's coursrs.</p>
        
        <button onClick={() => handleaddCourseResource('link')} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Link</button>
        <button onClick={() => handleaddCourseResource('image')} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Image</button>
        <button onClick={() => handleaddCourseResource('pdf')} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Pdf</button>
        <button onClick={() => deleteCourseModule(module.id)} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add delete</button>
    
    {module.resources.map(resource => (
        <Resource
          key={resource.id}
          resource={resource}
          moduleId={module.id}
          moveCourseResource={moveCourseResource}
          deleteCourseResource={deleteCourseResource}
        />
      ))}
      </div>
    </div>
    </>
  )
}

export default ModuleCard