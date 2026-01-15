export default function About() {
  const team = [
    { name: "Анна Иванова", role: "Арт-директор", experience: "12 лет" },
    { name: "Михаил Петров", role: "Главный архитектор", experience: "15 лет" },
    { name: "Елена Смирнова", role: "Дизайнер интерьеров", experience: "8 лет" },
    { name: "Дмитрий Козлов", role: "Бренд-стратег", experience: "10 лет" },
  ];

  return (
    <div className="min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-20">О студии</h1>
        
        <div className="grid md:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-3xl font-light mb-8">Философия</h2>
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
            <h2 className="text-3xl font-light mb-8">Подход</h2>
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

        <div>
          <h2 className="text-4xl font-light mb-16">Команда</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, index) => (
              <div key={index}>
                <div className="aspect-[3/4] bg-muted mb-6"></div>
                <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                <p className="text-muted-foreground mb-1">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.experience} опыта</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 py-20 border-t border-border">
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
    </div>
  );
}
