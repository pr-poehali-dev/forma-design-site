import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const categories = ["Все", "Интерьер", "Брендинг", "Digital", "Архитектура"];

const projects = [
  {
    id: 1,
    title: "Минималистичный интерьер",
    category: "Интерьер",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/77312ea4-7af0-47bd-8f12-dcdc6e2710ea.jpg",
  },
  {
    id: 2,
    title: "Корпоративный брендинг",
    category: "Брендинг",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/39a15c60-9fd7-44ce-a448-c287b112cd8b.jpg",
  },
  {
    id: 3,
    title: "Веб-дизайн для стартапа",
    category: "Digital",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/11f6a7f4-c435-4815-b587-856e162ea731.jpg",
  },
  {
    id: 4,
    title: "Жилой комплекс",
    category: "Архитектура",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/77312ea4-7af0-47bd-8f12-dcdc6e2710ea.jpg",
  },
  {
    id: 5,
    title: "Офисное пространство",
    category: "Интерьер",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/39a15c60-9fd7-44ce-a448-c287b112cd8b.jpg",
  },
  {
    id: 6,
    title: "Айдентика бренда",
    category: "Брендинг",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/11f6a7f4-c435-4815-b587-856e162ea731.jpg",
  },
];

const services = [
  {
    title: "Дизайн интерьера",
    description: "Создание функциональных и эстетичных жилых и коммерческих пространств с акцентом на минимализм и удобство.",
    features: ["Концепция и планировка", "3D-визуализация", "Авторский надзор", "Подбор материалов"],
    icon: "Home",
  },
  {
    title: "Архитектура",
    description: "Проектирование зданий и сооружений с учётом современных тенденций и экологических стандартов.",
    features: ["Архитектурная концепция", "Рабочая документация", "Согласование проекта", "Строительный надзор"],
    icon: "Building2",
  },
  {
    title: "Брендинг",
    description: "Разработка визуальной идентичности бренда от логотипа до полного фирменного стиля.",
    features: ["Логотип и айдентика", "Фирменный стиль", "Брендбук", "Упаковка"],
    icon: "Palette",
  },
  {
    title: "Digital-дизайн",
    description: "Создание современных веб-сайтов и цифровых продуктов с фокусом на пользовательский опыт.",
    features: ["UX/UI дизайн", "Веб-сайты", "Мобильные приложения", "Прототипирование"],
    icon: "Monitor",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "Минимализм в современном интерьере",
    excerpt: "Как создать функциональное пространство, используя принципы минимализма и не жертвуя комфортом.",
    date: "15 января 2024",
    category: "Интерьер",
    readTime: "5 мин",
  },
  {
    id: 2,
    title: "Тренды архитектуры 2024",
    excerpt: "Разбираем ключевые направления в современной архитектуре и их влияние на городскую среду.",
    date: "10 января 2024",
    category: "Архитектура",
    readTime: "7 мин",
  },
  {
    id: 3,
    title: "Психология цвета в брендинге",
    excerpt: "Как правильно выбрать цветовую палитру для бренда и почему это так важно для восприятия.",
    date: "5 января 2024",
    category: "Брендинг",
    readTime: "6 мин",
  },
];

const team = [
  { name: "Анна Иванова", role: "Арт-директор", experience: "12 лет" },
  { name: "Михаил Петров", role: "Главный архитектор", experience: "15 лет" },
  { name: "Елена Смирнова", role: "Дизайнер интерьеров", experience: "8 лет" },
  { name: "Дмитрий Козлов", role: "Бренд-стратег", experience: "10 лет" },
];

export default function Home() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("Все");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const filteredProjects = activeCategory === "Все" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо за обращение!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-12">
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
          <h2 className="text-5xl md:text-7xl font-light mb-12">Портфолио</h2>
          
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
      </section>

      <section id="about" className="py-32 px-6 md:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-20">О студии</h2>
          
          <div className="grid md:grid-cols-2 gap-20 mb-32">
            <div>
              <h3 className="text-3xl font-light mb-8">Философия</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Мы верим, что настоящий дизайн рождается на пересечении эстетики и функциональности. 
                Каждый проект для нас — это возможность создать что-то уникальное и значимое.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Наша работа начинается с глубокого понимания потребностей клиента и заканчивается 
                решением, которое превосходит ожидания.
              </p>
            </div>
            
            <div>
              <h3 className="text-3xl font-light mb-8">Подход</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Минимализм для нас — не просто стиль, а способ мышления. Мы убираем всё лишнее, 
                оставляя только то, что действительно важно и работает.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Внимание к деталям, качество исполнения и индивидуальный подход к каждому проекту — 
                основа нашей работы.
              </p>
            </div>
          </div>

          <div className="mb-32">
            <h3 className="text-4xl font-light mb-16">Команда</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {team.map((member, index) => (
                <div key={index}>
                  <div className="aspect-[3/4] bg-muted mb-6"></div>
                  <h4 className="text-xl font-medium mb-2">{member.name}</h4>
                  <p className="text-muted-foreground mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.experience} опыта</p>
                </div>
              ))}
            </div>
          </div>

          <div className="py-20 border-t border-border">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl font-light mb-4">150+</div>
                <p className="text-muted-foreground">Реализованных проектов</p>
              </div>
              <div>
                <div className="text-5xl font-light mb-4">8</div>
                <p className="text-muted-foreground">Лет на рынке</p>
              </div>
              <div>
                <div className="text-5xl font-light mb-4">25</div>
                <p className="text-muted-foreground">Международных наград</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-12">Услуги</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-32 font-light">
            Мы предлагаем комплексные решения в области дизайна — от архитектурных проектов 
            до создания цифровых продуктов.
          </p>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="grid md:grid-cols-2 gap-12 items-start pb-24 border-b border-border last:border-0"
              >
                <div>
                  <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center mb-8">
                    <Icon name={service.icon} size={32} />
                  </div>
                  <h3 className="text-4xl font-light mb-6">{service.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="md:pt-20">
                  <h4 className="text-xl font-medium mb-6">Что входит:</h4>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-32 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-12">Блог</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-32 font-light">
            Делимся мыслями о дизайне, архитектуре и всём, что нас вдохновляет.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {blogPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-muted mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 transition-transform duration-700 group-hover:scale-105"></div>
                </div>
                
                <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-light mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <time className="text-sm text-muted-foreground">{post.date}</time>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-32">Контакты</h2>

          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h3 className="text-3xl font-light mb-12">Свяжитесь с нами</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
                  />
                </div>
                
                <div>
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Расскажите о вашем проекте"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="border-0 border-b rounded-none px-0 focus-visible:ring-0 resize-none"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto px-12">
                  Отправить
                </Button>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <h4 className="text-2xl font-light mb-8">Офис</h4>
                <div className="space-y-6 text-muted-foreground">
                  <div className="flex gap-4">
                    <Icon name="MapPin" size={24} className="flex-shrink-0" />
                    <p>Москва, ул. Тверская, 15<br />Бизнес-центр "Форма", 7 этаж</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Icon name="Phone" size={24} className="flex-shrink-0" />
                    <p>+7 (495) 123-45-67</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Icon name="Mail" size={24} className="flex-shrink-0" />
                    <p>hello@forma.design</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-light mb-8">Время работы</h4>
                <div className="space-y-3 text-muted-foreground">
                  <p>Понедельник — Пятница: 10:00 — 19:00</p>
                  <p>Суббота: 11:00 — 16:00</p>
                  <p>Воскресенье: Выходной</p>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-light mb-8">Социальные сети</h4>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Instagram" size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Facebook" size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Linkedin" size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Twitter" size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
