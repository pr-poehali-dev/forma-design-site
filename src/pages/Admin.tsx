import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  images: string[];
}

export default function Admin() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    year: new Date().getFullYear().toString(),
    images: [] as string[],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now(),
      ...formData,
    };
    setProjects([...projects, newProject]);
    setFormData({
      title: "",
      category: "",
      description: "",
      year: new Date().getFullYear().toString(),
      images: [],
    });
    toast({
      title: "Проект добавлен!",
      description: "Новый проект успешно добавлен в портфолио.",
    });
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Проект удалён",
      description: "Проект был удалён из портфолио.",
    });
  };

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-light">Админ-панель</h1>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            На сайт
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-8">
            <h2 className="text-2xl font-light mb-8">Добавить проект</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Название проекта</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Минималистичный интерьер"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Категория</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
                <label className="block text-sm mb-2">Год</label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Описание</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  placeholder="Краткое описание проекта..."
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Изображения</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Icon name="Upload" size={32} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Нажмите для загрузки изображений</p>
                    <p className="text-sm text-muted-foreground mt-2">PNG, JPG до 10MB</p>
                  </label>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="aspect-square bg-muted rounded overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Icon name="Plus" className="mr-2" size={20} />
                Добавить проект
              </Button>
            </form>
          </Card>

          <div>
            <h2 className="text-2xl font-light mb-8">Список проектов ({projects.length})</h2>
            <div className="space-y-4">
              {projects.length === 0 ? (
                <Card className="p-12 text-center">
                  <Icon name="FolderOpen" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Пока нет добавленных проектов</p>
                </Card>
              ) : (
                projects.map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="flex gap-4">
                      {project.images[0] && (
                        <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                          <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium mb-1">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {project.category} • {project.year}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}