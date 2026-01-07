// components/Footer.js
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sidebar/80 backdrop-blur-md shadow-inner py-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} StudentERP. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="text-muted-foreground hover:text-accent-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-accent-foreground transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-accent-foreground transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
