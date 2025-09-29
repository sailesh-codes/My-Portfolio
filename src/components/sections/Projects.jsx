import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const projects = [
  {
    title: 'Code Craft',
    description:
      'Code Craft is a professional web service provider specializing in custom web development and software solutions to help businesses grow online.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    image: '/images/projectcodecraft-img.png',
    github: 'https://github.com/sailesh-codes/Code-Craft',
  },
  {
    title: 'MoviePedia',
    description:
      'MoviePedia is a movie database website that provides information about movies, including their titles',
    tech: ['API', 'React', 'Tailwind CSS'],
    image: '/images/projectMP-img.png',
    github: 'https://github.com/sailesh-codes/MoviePedia',
  },
  {
    title: 'Indoor Railway Navigation System',
    description:
      'This is a wayfinding technology that uses digital maps, and mobile/display interfaces to guide passengers through complex railway stations, terminals.',
    tech: ['React', 'Node.js', 'Express', 'Socket.io'],
    image: '/images/project1-img.jpg',
    github: 'https://github.com/sailesh-codes/Railway-Navigation-project',
  },
  {
    title: 'Think Stack',
    description:
      'Think Stack is an AI-powered quiz generator that creates dynamic and engaging quizzes based on user prompts.',
    tech: ['React', 'Express', 'API', 'MongoDb'],
    image: '/images/project2-img.jpg',
    github: 'https://github.com/sailesh-codes/Think-Stack',
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
  return (
    <section id="projects" className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border rounded-xl p-6 card-hover flex flex-col"
            >
              <div className="mb-4">
                <img
                  className="w-full h-48 object-contain rounded-lg mb-4 bg-black"
                  alt={`${project.title} preview`}
                  src={project.image}
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="skill-tag px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-auto">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    type="button"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                </a>
                {project.title === 'Code Craft' && (
                  <a
                    href="https://code-craft-pied.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      type="button"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                  </a>
                )}
                {project.title === 'MoviePedia' && (
                  <a
                    href="https://movie-pedia-navy.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      type="button"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;