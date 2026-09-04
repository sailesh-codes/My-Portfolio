import React from 'react';

export const AgentsSection: React.FC = () => {
  return (
    <section
      id="agents"
      className="relative w-full h-screen min-h-[700px] bg-[#161616] overflow-hidden z-20"
      aria-label="Agents Showcase"
    >
      <iframe
        src="/landing-pages/bestsellers-book-showcase.html"
        title="Agents — Field Manuals"
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
        loading="eager"
        className="absolute inset-0 w-full h-full border-0 bg-[#161616] block"
      />
    </section>
  );
};

export default AgentsSection;
