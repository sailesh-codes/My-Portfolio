import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail ,BookOpen , PenTool , MessageSquare ,Bookmark} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

const Contact = () => {
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/saileshtrn06@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      toast({
        title: 'Message sent successfully',
        description: "Thanks! I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again or email me directly.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="section-padding px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your next project or just say hello. I'm always open to new opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
            <div className="space-y-4">
              <a
                href="mailto:saileshtrn06@gmail.com"
                className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                <Mail className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">saileshtrn06@gmail.com</p>
                </div>
              </a>
              <a
                href="https://github.com/sailesh-codes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                <Github className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-muted-foreground">@sailesh-codes</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/sailesh-t-955780323/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                <Linkedin className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-muted-foreground">@sailesh</p>
                </div>
              </a>
              <a
                href="https://codelogics.hashnode.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:bg-accent transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium">Blog</p>
                  <p className="text-muted-foreground">@code logics</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="New message from portfolio contact form" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  name="message"
                  className="w-full px-4 py-3 bg-background border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;