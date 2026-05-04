export type Project = {
  id: string;
  name: string;
  role: string;
  year: number;
  description: string;
  images?: string[];
  tech_stack: string[];
  link?: string;
  partner?: string;
};
