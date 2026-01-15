import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const links = [
    { id: "hero", label: "Главная" },
    { id: "portfolio", label: "Портфолио" },
    { id: "services", label: "Услуги" },
    { id: "about", label: "О студии" },
    { id: "contact", label: "Контакты" },
  ];

  if (location.pathname === '/admin') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              Forma
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На сайт
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Forma
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Админ
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-6 space-y-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block py-2 text-left w-full transition-colors hover:text-primary text-muted-foreground"
              >
                {link.label}
              </button>
            ))}
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                <Icon name="Settings" size={16} className="mr-2" />
                Админ
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}