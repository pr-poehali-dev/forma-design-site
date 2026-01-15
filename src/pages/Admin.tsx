import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function Admin() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5fea0e5c-ce58-4850-b2a3-12e715d19e39');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заявки",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">Админ-панель</h1>
            <p className="text-xl text-muted-foreground">Заявки от клиентов</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            На сайт
          </Button>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
              Всего заявок: {contacts.length}
            </div>
          </div>
          <Button onClick={fetchContacts} variant="outline">
            <Icon name="RefreshCw" className="mr-2" size={18} />
            Обновить
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Icon name="Loader2" className="animate-spin text-primary" size={48} />
          </div>
        ) : contacts.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon name="Inbox" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-2xl font-semibold mb-2">Пока нет заявок</h3>
            <p className="text-muted-foreground">Новые заявки появятся здесь</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(contact.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={18} className="text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                      {contact.email}
                    </a>
                  </div>

                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={18} className="text-muted-foreground" />
                      <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Icon name="MessageSquare" size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="font-medium">Сообщение:</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    {contact.message}
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button size="sm" className="flex-1" asChild>
                    <a href={`mailto:${contact.email}`}>
                      <Icon name="Mail" className="mr-2" size={16} />
                      Ответить на почту
                    </a>
                  </Button>
                  {contact.phone && (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={`tel:${contact.phone}`}>
                        <Icon name="Phone" className="mr-2" size={16} />
                        Позвонить
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
