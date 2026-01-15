import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description?: string;
  image: string;
}

export default function Admin() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    year: new Date().getFullYear().toString(),
    description: "",
    image: "",
  });
  const [editingProject, setEditingProject] = useState<number | null>(null);

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
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/e8df9bb0-a41e-4d5a-bec5-e82a19344964');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить проекты",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchProjects();
  }, []);

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = 'https://functions.poehali.dev/e8df9bb0-a41e-4d5a-bec5-e82a19344964';
      const body = editingProject ? { ...projectForm, id: editingProject } : projectForm;
      
      const response = await fetch(url, {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Failed to save project');

      toast({
        title: editingProject ? "Проект обновлён!" : "Проект добавлен!",
        description: editingProject ? "Изменения сохранены" : "Новый проект добавлен в портфолио",
      });

      setProjectForm({
        title: "",
        category: "",
        year: new Date().getFullYear().toString(),
        description: "",
        image: "",
      });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить проект",
        variant: "destructive",
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      category: project.category,
      year: project.year,
      description: project.description || "",
      image: project.image,
    });
    setEditingProject(project.id);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;

    try {
      const response = await fetch(
        `https://functions.poehali.dev/e8df9bb0-a41e-4d5a-bec5-e82a19344964?id=${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete project');

      toast({
        title: "Проект удалён",
        description: "Проект был удалён из портфолио",
      });

      fetchProjects();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить проект",
        variant: "destructive",
      });
    }
  };

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
            <p className="text-xl text-muted-foreground">Управление контентом сайта</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            На сайт
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="projects" className="text-lg">
              <Icon name="FolderOpen" className="mr-2" size={20} />
              Портфолио ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-lg">
              <Icon name="Mail" className="mr-2" size={20} />
              Заявки ({contacts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  {editingProject ? 'Редактировать проект' : 'Добавить проект'}
                </h2>
                
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название проекта</label>
                    <Input
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                      placeholder="Корпоративный брендинг"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Категория</label>
                    <Select 
                      value={projectForm.category} 
                      onValueChange={(value) => setProjectForm({ ...projectForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Брендинг">Брендинг</SelectItem>
                        <SelectItem value="Digital">Digital</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Полиграфия">Полиграфия</SelectItem>
                        <SelectItem value="AI-дизайн">AI-дизайн</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Год</label>
                    <Input
                      value={projectForm.year}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      required
                      placeholder="2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Описание (необязательно)</label>
                    <Textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Краткое описание проекта"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">URL изображения</label>
                    <Input
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      required
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      <Icon name={editingProject ? "Save" : "Plus"} className="mr-2" size={18} />
                      {editingProject ? 'Сохранить изменения' : 'Добавить проект'}
                    </Button>
                    {editingProject && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setEditingProject(null);
                          setProjectForm({
                            title: "",
                            category: "",
                            year: new Date().getFullYear().toString(),
                            description: "",
                            image: "",
                          });
                        }}
                      >
                        Отменить
                      </Button>
                    )}
                  </div>
                </form>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-6">Текущие проекты</h2>
                
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <Icon name="Loader2" className="animate-spin text-primary" size={48} />
                  </div>
                ) : projects.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Icon name="FolderOpen" className="mx-auto mb-4 text-muted-foreground" size={64} />
                    <h3 className="text-xl font-semibold mb-2">Нет проектов</h3>
                    <p className="text-muted-foreground">Добавьте первый проект в портфолио</p>
                  </Card>
                ) : (
                  projects.map((project) => (
                    <Card key={project.id} className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {project.category} • {project.year}
                          </p>
                          {project.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {project.description}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditProject(project)}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="mb-8 flex items-center justify-between">
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                Всего заявок: {contacts.length}
              </div>
              <Button onClick={fetchContacts} variant="outline">
                <Icon name="RefreshCw" className="mr-2" size={18} />
                Обновить
              </Button>
            </div>

            {contacts.length === 0 ? (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
