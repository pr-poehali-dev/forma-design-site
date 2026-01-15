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
  {
    id: 4,
    title: "UX-дизайн: фокус на пользователя",
    excerpt: "Основные принципы создания пользовательских интерфейсов, которые действительно работают.",
    date: "28 декабря 2023",
    category: "Digital",
    readTime: "8 мин",
  },
  {
    id: 5,
    title: "Экологичность в дизайне",
    excerpt: "Как современные дизайнеры внедряют принципы устойчивого развития в свои проекты.",
    date: "20 декабря 2023",
    category: "Тренды",
    readTime: "6 мин",
  },
  {
    id: 6,
    title: "Свет как инструмент дизайна",
    excerpt: "Разбираем, как правильное освещение может полностью изменить восприятие пространства.",
    date: "15 декабря 2023",
    category: "Интерьер",
    readTime: "5 мин",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-12">Блог</h1>
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
              
              <h2 className="text-2xl font-light mb-4 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              
              <time className="text-sm text-muted-foreground">{post.date}</time>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
