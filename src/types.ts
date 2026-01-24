// src/types.ts

export interface SocialLink {
  name: string;
  url: string;
  color: string;
  icon: 'Github' | 'Instagram' | 'Facebook' | 'MessageCircle';
}

export interface ContactInfo {
  email: string;
  phone: string;
  phoneUrl?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  socials?: SocialLink[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  location?: string;
  contact: ContactInfo;
}

export interface ProjectLinks {
  deploy?: string;
  github?: string;
  download?: string;
}

export interface ProjectDetails {
  overview: string;
  features: string[];
  stack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    mobile?: string[];
    tools?: string[];
  };
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  tech: string[] | string;
  img?: string;
  images?: string[]; // Array de URLs para el carrusel
  links?: ProjectLinks;
  details?: ProjectDetails;
}

export interface ProjectsData {
  relevant: Project[];
  intermediate: Project[];
  mini: Project[];
}