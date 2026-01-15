import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["Все", "Интерьер", "Брендинг", "Digital", "Архитектура"];

const projects = [
  {
    id: 1,
    title: "Минималистичный интерьер",
    category: "Интерьер",
    year: "2024",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Корпоративный брендинг",
    category: "Брендинг",
    year: "2024",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Веб-дизайн для стартапа",
    category: "Digital",
    year: "2023",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Жилой комплекс",
    category: "Архитектура",
    year: "2023",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Офисное пространство",
    category: "Интерьер",
    year: "2024",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Айдентика бренда",
    category: "Брендинг",
    year: "2023",
    image: "/placeholder.svg",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredProjects = activeCategory === "Все" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-20">Портфолио</h1>
        
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-muted mb-6 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                  <h3 className="text-xl font-light">{project.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
