import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-padding px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card border rounded-xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                alt="Sailesh - Full Stack Developer"
               src="https://images.unsplash.com/photo-1634835855106-f4f0dc8279ca" />
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a passionate full-stack developer with expertise in modern web technologies.
                I love creating efficient, scalable solutions that solve real-world problems.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                With a strong foundation in React, Node.js, and Express, I build applications
                that are not only functional but also provide exceptional user experiences.
                I'm always eager to learn new technologies and take on challenging projects.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                When I'm not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;