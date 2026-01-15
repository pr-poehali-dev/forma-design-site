import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо за обращение!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-32">Контакты</h1>

        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-light mb-12">Свяжитесь с нами</h2>
            
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
              <h3 className="text-2xl font-light mb-8">Офис</h3>
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
              <h3 className="text-2xl font-light mb-8">Время работы</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>Понедельник — Пятница: 10:00 — 19:00</p>
                <p>Суббота: 11:00 — 16:00</p>
                <p>Воскресенье: Выходной</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-8">Социальные сети</h3>
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
    </div>
  );
}
