# Project Showcase Metadata Schema

Data structure schema for project cards, case study narratives, and architectural breakdown sections.

## 1. Schema Definition

```typescript
export interface ProjectShowcase {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI Systems' | 'Infrastructure' | 'Mobile';
  period: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}
```

## 2. Media Presentation

- Responsive picture tags serving tailored aspect ratios for mobile ($4:3$) vs desktop ($16:9$).

