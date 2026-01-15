import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Forma</h3>
            <p className="text-muted-foreground leading-relaxed">
              Студия дизайна полного цикла. Создаём бренды, сайты и digital-продукты.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Навигация</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#hero" className="hover:text-primary transition-colors inline-flex items-center gap-2">Главная</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors inline-flex items-center gap-2">Портфолио</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors inline-flex items-center gap-2">Услуги</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors inline-flex items-center gap-2">О студии</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Контакты</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Icon name="Phone" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Mail" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>hello@forma.design</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="MessageCircle" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span>@forma_design</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Социальные сети</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Icon name="Send" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Icon name="Github" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Forma. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}