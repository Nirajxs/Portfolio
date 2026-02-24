export type SectionId =
  | 'home'
  | 'overview'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'certification'
  | 'contact';

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;   // 👈 ye line add karo
};

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export type Certification = {
  title: string;
  provider: string;
  year: string;
  duration: string;
  image: string;
  description: string;
};
export interface Contact {
  email: string;
  phone: string;
  location?: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface PortfolioData {
  name: string;
  role: string;
  subRole: string;
  aboutMe: string;

  contact: Contact;

  skills: {
    frontend: SkillCategory;
    backend: SkillCategory;
    database: SkillCategory;
    tools: SkillCategory;
    platforms: SkillCategory;
  };

  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
};