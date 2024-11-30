import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineDelete } from "react-icons/ai";

const Resource = ({ resource, moduleId, moveCourseResource, deleteCourseResource }) => {
  const [, ref] = useDrop({
    accept: 'RESOURCE',
    hover(item) {
      if (item.id !== resource.id) {
        moveCourseResource(item.moduleId, moduleId, item.id, resource.id);
        item.id = resource.id;
        item.moduleId = moduleId;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'RESOURCE',
    item: { id: resource.id, moduleId },
    collect: (view) => ({
      isDragging: view.isDragging(),
    }),
  });

  return (
    <div ref={(node) => drag(ref(node))} className="resource" style={{ opacity: isDragging ? 0.5 : 1 }}>
    

    <div class="max-w-sm p-2 bg-white border border-gray-100 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700">
        <p class="mb-2 font-normal text-gray-500 dark:text-gray-400 flex right-0"><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name} </a>
        <button onClick={() => deleteCourseResource(moduleId, resource.id)}><AiOutlineDelete /></button></p>
        
    </div>
    </div>
  );
};

export default Resource;

