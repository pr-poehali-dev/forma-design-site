import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-light mb-6">Forma</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Студия дизайна, создающая пространства и бренды с фокусом на чистоту форм.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Навигация</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Главная</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Портфолио</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">О студии</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Услуги</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Москва, ул. Тверская, 15</li>
              <li>+7 (495) 123-45-67</li>
              <li>hello@forma.design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Социальные сети</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Forma. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
