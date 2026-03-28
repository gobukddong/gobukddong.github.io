"use client";

import { useState } from "react";
import { Project, projects } from "@/data/projects";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

export default function VideoGrid({ isBlackHoleActive = false }: { isBlackHoleActive?: boolean }) {
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <VideoCard 
            key={project.id} 
            project={project} 
            index={index}
            onClick={handleOpenModal} 
            priority={index < 4}
            isBlackHoleActive={isBlackHoleActive}
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
