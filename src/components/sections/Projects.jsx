import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Timeline } from '../ui/timeline';

const projects = [
  {
    title: 'Code Craft',
    description:
      'Code Craft is a professional web service provider specializing in custom web development and software solutions to help businesses grow online.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    image: '/images/projectcodecraft-img.png',
    github: 'https://www.codecraftnet.com/',
  },
  {
    title: 'Megasifi',
    description:
      'Megasifi is a modern e-commerce platform offering a vareity of stylish collection',
    tech: ['TypeScript', 'API', 'Tailwind CSS'],
    image: '/images/megasifi.jpeg',
    github: 'https://megasifi.shop/',
  },
  {
    title: 'Studio6 Interiors',
    description:
      'Studio6 Interiors creates elegant, functional home and office interiors tailored to your style.',
    tech: ['API', 'React', 'Tailwind CSS'],
    image: '/images/studio6.jpeg',
    github: 'https://www.studio6interiors.in/',
  },
  {
    title: 'CottonCandy Designs',
    description:
      'CottonCandy Designs is a creative studio specializing in branding, poster designing, and etc.',
    tech: ['React', 'Node.js', 'Express',],
    image: '/images/CottonCandyDesings.jpeg',
    github: 'https://www.cottoncandydesigns.in/',
  },
  {
    title: 'Echo AI',
    description:
      'Echo AI is a conversational AI assistant designed for productivity.',
    tech: ['React', 'Express', 'API'],
    image: '/images/project_Echo.png',
    github: 'https://echo-ai-one-xi.vercel.app/',
  },
  {
    title: 'N8N Workflow',
    description:
      'n8n is a visual workflow automation platform that connects apps, APIs, and AI services through nodes to create powerful automated workflows.',
    tech: ['N8N', 'Automation', 'Workflow'],
    image: '/images/project3-2-img.png',
    github: 'https://github.com/sailesh-codes/n8n-Workflows',
  },
];

const Projects = () => {
  const timelineData = projects.map((project, index) => ({
    title: project.title,
    content: (
      <div className="bg-card w-full overflow-hidden relative border rounded-xl p-6 shadow-sm group">
        <div className="project-card-glow"></div>
        <div className="mb-4 overflow-hidden rounded-lg bg-black flex items-center justify-center">
          <img
            className="w-full h-auto max-h-[350px] object-contain rounded-lg bg-black transition-transform duration-300 group-hover:scale-105"
            alt={`${project.title} preview`}
            src={project.image}
          />
        </div>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="skill-tag px-3 py-1 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-auto">
          {/* Live Demo button for all cards */}
          <a href={project.demo || project.github || '#'} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              type="button"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
          </a>

          {/* Code button strictly for the last card */}
          {index === projects.length - 1 && (
            <a href={project.github || '#'} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                type="button"
              >
                <Github className="w-4 h-4" />
                Code
              </Button>
            </a>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <section id="projects" className="w-full relative">
      <Timeline data={timelineData} />
    </section>
  );
};

export default Projects;