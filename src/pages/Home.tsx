import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const categories = ["Все", "Брендинг", "Digital", "E-commerce", "Полиграфия", "AI-дизайн"];

const projects = [
  {
    id: 1,
    title: "Корпоративный брендинг",
    category: "Брендинг",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/39a15c60-9fd7-44ce-a448-c287b112cd8b.jpg",
  },
  {
    id: 2,
    title: "Веб-дизайн для стартапа",
    category: "Digital",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/11f6a7f4-c435-4815-b587-856e162ea731.jpg",
  },
  {
    id: 3,
    title: "Карточки для маркетплейсов",
    category: "E-commerce",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/77312ea4-7af0-47bd-8f12-dcdc6e2710ea.jpg",
  },
  {
    id: 4,
    title: "Бизнес-презентация",
    category: "Полиграфия",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/39a15c60-9fd7-44ce-a448-c287b112cd8b.jpg",
  },
  {
    id: 5,
    title: "AI-иллюстрации для бренда",
    category: "AI-дизайн",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/11f6a7f4-c435-4815-b587-856e162ea731.jpg",
  },
  {
    id: 6,
    title: "Фирменный стиль",
    category: "Брендинг",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/1c06e79a-d17f-433f-931a-411778323fcf/files/77312ea4-7af0-47bd-8f12-dcdc6e2710ea.jpg",
  },
];

const services = [
  {
    title: "Брендинг и айдентика",
    description: "Создаём узнаваемые бренды с нуля: от нейминга и логотипа до полноценных гайдлайнов и фирменного стиля.",
    features: ["Нейминг и логотип", "Фирменный стиль", "Брендбук и гайдлайны", "Упаковка продукта"],
    icon: "Sparkles",
  },
  {
    title: "Digital-продукты",
    description: "Разрабатываем сайты и интерфейсы на Tilda, Webflow или чистым кодом. Адаптивная вёрстка и продуманный UX/UI.",
    features: ["Дизайн сайтов", "UI/UX интерфейсы", "Мобильные приложения", "Адаптивная вёрстка"],
    icon: "Monitor",
  },
  {
    title: "Презентации и каталоги",
    description: "Создаём впечатляющие презентационные материалы: инвест-питчи, бизнес-презентации, каталоги и прайс-листы.",
    features: ["Инвест-питчи", "Бизнес-презентации", "Каталоги продукции", "Прайс-листы"],
    icon: "FileText",
  },
  {
    title: "Дизайн для e-commerce",
    description: "Полный цикр для маркетплейсов: карточки Wildberries/Ozon, промо-лендинги, email-рассылки, креативы для таргета.",
    features: ["Карточки WB/Ozon", "Промо-лендинги", "Email-рассылки", "Креативы для рекламы"],
    icon: "ShoppingBag",
  },
  {
    title: "Полиграфия и упаковка",
    description: "Разрабатываем полиграфическую продукцию любой сложности: от визиток до дизайна упаковки.",
    features: ["Визитки и буклеты", "Листовки и флаеры", "Дизайн упаковки", "Брендированная продукция"],
    icon: "Package",
  },
  {
    title: "Генеративный и AI-дизайн",
    description: "Используем нейросети для создания уникальных иллюстраций, обработки фото, генерации контента.",
    features: ["AI-иллюстрации", "Обработка фото", "Генерация контента", "Уникальные визуалы"],
    icon: "Wand2",
  },
];

const stats = [
  { value: "200+", label: "Реализованных проектов" },
  { value: "5 лет", label: "На рынке" },
  { value: "48 ч", label: "Средний срок разработки" },
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
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light mb-8">
            Берём любую задачу по дизайну и делаем под ключ
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl font-light">
            Нужен сайт? Сделаем. Нужны прайсы, презентации и карточки для маркетплейсов? 
            Сделаем всё в одном стиле. Верстаем, оформляем, обрабатываем. Быстро и в цель.
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

      <section className="py-20 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-light mb-4">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
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

      <section id="services" className="py-32 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-12">Наши навыки</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 bg-background hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center mb-6">
                  <Icon name={service.icon} size={24} />
                </div>
                <h3 className="text-2xl font-light mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-light mb-12">О студии</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Forma — это команда дизайнеров, которые работают на результат. 
            Мы не просто делаем красиво — мы создаём инструменты для вашего бизнеса.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Наш подход: быстро погружаемся в задачу, работаем в едином стиле, 
            делаем всё под ключ. От первого макета до финальной вёрстки.
          </p>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12 bg-muted/30">
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
                    placeholder="Расскажите о вашей задаче"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="border-0 border-b rounded-none px-0 focus-visible:ring-0 resize-none"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto px-12">
                  Отправить заявку
                </Button>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <h4 className="text-2xl font-light mb-8">Контактная информация</h4>
                <div className="space-y-6 text-muted-foreground">
                  <div className="flex gap-4">
                    <Icon name="Mail" size={24} className="flex-shrink-0" />
                    <p>hello@forma.design</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Icon name="Phone" size={24} className="flex-shrink-0" />
                    <p>+7 (495) 123-45-67</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Icon name="MessageCircle" size={24} className="flex-shrink-0" />
                    <p>Telegram: @forma_design</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-light mb-8">Время работы</h4>
                <div className="space-y-3 text-muted-foreground">
                  <p>Понедельник — Пятница: 10:00 — 19:00</p>
                  <p>Суббота — Воскресенье: По договорённости</p>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-light mb-8">Социальные сети</h4>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Instagram" size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Linkedin" size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Icon name="Send" size={24} />
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
