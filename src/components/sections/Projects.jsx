import React from 'react';
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
    tech: ['React', 'Node.js', 'Express'],
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
      <div className="scfo-card rounded-xl p-5 sm:p-7 border border-white/10 group">
        <div className="mb-5 overflow-hidden rounded-lg bg-[#040406] border border-white/10 flex items-center justify-center">
          <img
            className="w-full h-auto max-h-[340px] object-contain rounded-lg transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            alt={`${project.title} preview`}
            src={project.image}
          />
        </div>

        <p className="text-white/70 mb-5 text-sm sm:text-base leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Tech Tag Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="scfo-tag border border-white/15 bg-white/[0.03] px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Link Buttons */}
        <div className="flex flex-wrap gap-3 mt-auto">
          <a href={project.demo || project.github || '#'} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-xs font-mono tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
              type="button"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </Button>
          </a>

          {index === projects.length - 1 && (
            <a href={project.github || '#'} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-xs font-mono tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
                type="button"
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </Button>
            </a>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <section id="projects" className="w-full relative border-t border-white/10">
      <Timeline data={timelineData} />
    </section>
  );
};

export default Projects;