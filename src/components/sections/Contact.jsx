import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail ,BookOpen , PenTool , MessageSquare ,Bookmark} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { FloatingDock } from '../ui/floating-dock';

const socialLinks = [
  {
    title: "Email",
    icon: <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "mailto:saileshtrn06@gmail.com",
  },
  {
    title: "GitHub",
    icon: <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://github.com/sailesh-codes",
  },
  {
    title: "LinkedIn",
    icon: <Linkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://www.linkedin.com/in/sailesh-t-955780323/",
  },
  {
    title: "Blog",
    icon: <MessageSquare className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://codelogics.hashnode.dev/",
  }
];

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
    <section id="contact" className="section-padding md:px-6">
      <div className="max-w-4xl mx-auto w-[85%] md:w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
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
            <div className="flex items-center justify-start w-full py-8">
              <FloatingDock mobileClassName="translate-y-0" desktopClassName="ml-0 mx-0" items={socialLinks} />
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
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] text-white font-semibold h-12 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
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