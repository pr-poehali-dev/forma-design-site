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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/5fea0e5c-ce58-4850-b2a3-12e715d19e39', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast({
        title: "Спасибо за обращение!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="max-w-6xl w-full relative z-10">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            ✨ Дизайн-студия полного цикла
          </div>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Forma
          </h1>
          <p className="text-2xl md:text-3xl text-foreground max-w-2xl font-medium mb-6">
            Берём любую задачу по дизайну и делаем под ключ
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Нужен сайт? Сделаем. Нужны прайсы, презентации и карточки для маркетплейсов? 
            Сделаем всё в одном стиле. Верстаем, оформляем, обрабатываем. Быстро и в цель.
          </p>
          <div className="flex flex-wrap gap-4 mt-12">
            <Button 
              size="lg"
              className="px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Смотреть работы
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4">Портфолио</h2>
              <p className="text-xl text-muted-foreground">Наши последние работы</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="px-6 rounded-full transition-all hover:scale-105"
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
                <div className="aspect-[4/5] bg-muted mb-6 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex justify-between items-start px-2">
                  <div>
                    <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-6 md:px-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Наши навыки</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр дизайн-услуг для вашего бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-8 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-md">
                  <Icon name={service.icon} size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
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
          <h2 className="text-5xl md:text-7xl font-bold mb-12">О студии</h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            Forma — это команда дизайнеров, которые работают на результат. 
            Мы не просто делаем красиво — мы создаём инструменты для вашего бизнеса.
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Наш подход: быстро погружаемся в задачу, работаем в едином стиле, 
            делаем всё под ключ. От первого макета до финальной вёрстки.
          </p>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-20 text-center">Контакты</h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-card rounded-2xl p-10 border border-border shadow-lg">
              <h3 className="text-3xl font-semibold mb-8">Свяжитесь с нами</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="ivan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Расскажите о вашей задаче</label>
                  <Textarea
                    placeholder="Опишите, что вам нужно..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full shadow-lg hover:shadow-xl transition-all">
                  Отправить заявку
                  <Icon name="Send" className="ml-2" size={18} />
                </Button>
              </form>
            </div>

            <div className="space-y-10">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h4 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  Контактная информация
                </h4>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <p className="text-muted-foreground">hello@forma.design</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Telegram</p>
                      <p className="text-muted-foreground">@forma_design</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h4 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Icon name="Clock" size={24} className="text-primary" />
                  Время работы
                </h4>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex justify-between">
                    <span>Понедельник — Пятница</span>
                    <span className="font-medium">10:00 — 19:00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Суббота — Воскресенье</span>
                    <span className="font-medium">По договорённости</span>
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h4 className="text-2xl font-semibold mb-6">Социальные сети</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                    <Icon name="Instagram" size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                    <Icon name="Linkedin" size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
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