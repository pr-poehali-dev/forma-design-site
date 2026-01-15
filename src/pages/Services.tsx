import Icon from "@/components/ui/icon";

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

export default function Services() {
  return (
    <div className="min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-12">Услуги</h1>
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
                <h2 className="text-4xl font-light mb-6">{service.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="md:pt-20">
                <h3 className="text-xl font-medium mb-6">Что входит:</h3>
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

        <div className="mt-32 bg-muted/30 p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Индивидуальный подход</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Каждый проект уникален. Мы готовы обсудить вашу задачу и предложить решение, 
            которое идеально подойдёт именно вам.
          </p>
        </div>
      </div>
    </div>
  );
}
