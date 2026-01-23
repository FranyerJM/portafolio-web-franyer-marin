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

export interface Project {
  id: number;
  title: string;
  description?: string;
  tech: string[] | string;
  img?: string;
  images?: string[]; // Array de URLs para el carrusel
  links?: ProjectLinks;
}

export interface ProjectsData {
  relevant: Project[];
  intermediate: Project[];
  mini: Project[];
}