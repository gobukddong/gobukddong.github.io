"use client";

import { useState } from "react";
import { Project, projects } from "@/data/projects";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

export default function VideoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Short delay to allow exit animation before clearing data
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <VideoCard 
            key={project.id} 
            project={project} 
            onClick={handleOpenModal} 
            priority={index < 4}
          />
        ))}
      </div>
      <VideoModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </>
  );
}
