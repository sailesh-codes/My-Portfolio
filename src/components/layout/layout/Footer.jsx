import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t bg-card/50">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Sailesh. All rights reserved.<br/>
          (Disclaimer: All bugs were harmed during development)
        </p>
      </div>
    </footer>
  );
};

export default Footer;