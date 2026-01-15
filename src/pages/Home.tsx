import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const featuredProjects = [
  {
    id: 1,
    title: "Минималистичный интерьер",
    category: "Интерьер",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/77312ea4-7af0-47bd-8f12-dcdc6e2710ea.jpg",
  },
  {
    id: 2,
    title: "Корпоративный брендинг",
    category: "Брендинг",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/39a15c60-9fd7-44ce-a448-c287b112cd8b.jpg",
  },
  {
    id: 3,
    title: "Веб-дизайн для стартапа",
    category: "Digital",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/11f6a7f4-c435-4815-b587-856e162ea731.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-6xl w-full">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8">
            Forma
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
            Студия дизайна, создающая пространства и бренды с фокусом на чистоту форм и функциональность
          </p>
          <Button 
            className="mt-12 px-8 py-6 text-lg"
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Смотреть работы
            <Icon name="ArrowDown" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section id="portfolio" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-20">Избранные работы</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-muted mb-6 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                <h3 className="text-xl font-light">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-12">О студии</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Forma — это команда профессионалов, объединённых любовью к минимализму и функциональному дизайну. 
            Мы создаём визуальные решения, которые работают на бизнес и радуют глаз.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Наш подход основан на глубоком понимании задач клиента, внимании к деталям 
            и стремлении к совершенству в каждом проекте.
          </p>
        </div>
      </section>
    </div>
  );
}