import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { categories } from "@/data/mockData";
import ImageUploader from "@/components/ImageUploader";
import { useAuth } from "@/contexts/AuthContext";
import { createSheetRecord, SheetNames } from "@/utils/sheetsService";

const CreateListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [category, setCategory] = useState("autos");
  const [subcategory, setSubcategory] = useState("");
  const [subcategoriesOptions, setSubcategoriesOptions] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageIds, setImageIds] = useState<string[]>([]);

  // Form field validation
  const [errors, setErrors] = useState<{
    title?: string;
    price?: string;
    description?: string;
    location?: string;
    contact?: string;
  }>({});

  useEffect(() => {
    const found = categories.find((cat) => cat.slug === category);
    setSubcategoriesOptions(found?.subcategories || []);
    setSubcategory("");
  }, [category]);

  // Initialize contact with user's info
  useEffect(() => {
    if (user && user.email) {
      setContact(user.email);
    }
  }, [user]);
  
  const handleImageSaved = (imageId: string) => {
    setImageIds((prev) => [...prev, imageId]);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!title.trim()) newErrors.title = "O título é obrigatório";
    if (!price.trim()) newErrors.price = "O preço é obrigatório";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória";
    if (!location.trim()) newErrors.location = "A localização é obrigatória";
    if (!contact.trim()) newErrors.contact = "O contato é obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare data for submission
      const listingData = {
        id: `listing_${Date.now()}`,
        title,
        price: category === "empregos" ? Number(price) : Number(price),
        description,
        images: imageIds,
        location,
        date: new Date().toISOString().split('T')[0],
        sellerName: user?.username || "Usuário Anônimo",
        sellerContact: contact,
        category,
        subcategory,
        userId: user?.id || "anonymous",
        status: "pending", // All listings start as pending for admin approval
      };
      
      // Submit to Google Sheets via the API
      await createSheetRecord(SheetNames.LISTINGS, listingData);
      
      toast({
        title: "Anúncio criado com sucesso!",
        description: "Seu anúncio será revisado pelo administrador antes de ser publicado.",
      });
      
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao criar anúncio:", error);
      toast({
        title: "Erro ao criar anúncio",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAutoForm = () => (
    <>
      {renderSubcategorySelector()}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
            <Input id="brand" placeholder="Ex: Toyota, Honda, Volkswagen" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Modelo</Label>
            <Input id="model" placeholder="Ex: Corolla, Civic, Gol" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Ano</Label>
            <Input id="year" type="number" placeholder="Ex: 2020" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mileage">Quilometragem</Label>
            <Input id="mileage" type="number" placeholder="Ex: 45000" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fuel">Combustível</Label>
            <Select defaultValue="flex">
              <SelectTrigger id="fuel">
                <SelectValue placeholder="Selecione o combustível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="gasolina">Gasolina</SelectItem>
                <SelectItem value="etanol">Etanol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="eletrico">Elétrico</SelectItem>
                <SelectItem value="hibrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="transmission">Câmbio</Label>
            <Select defaultValue="automatico">
              <SelectTrigger id="transmission">
                <SelectValue placeholder="Selecione o câmbio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatico">Automático</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="semi-automatico">Semi-automático</SelectItem>
                <SelectItem value="cvt">CVT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="color">Cor</Label>
          <Input id="color" placeholder="Ex: Prata, Preto, Branco" />
        </div>
      </div>
    </>
  );
  
  const renderJobForm = () => (
    <>
      {renderSubcategorySelector()}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobType">Tipo de contrato</Label>
          <Select defaultValue="clt">
            <SelectTrigger id="jobType">
              <SelectValue placeholder="Selecione o tipo de contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clt">CLT</SelectItem>
              <SelectItem value="pj">PJ</SelectItem>
              <SelectItem value="temporario">Temporário</SelectItem>
              <SelectItem value="estagio">Estágio</SelectItem>
              <SelectItem value="freelancer">Freelancer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="education">Escolaridade</Label>
          <Select defaultValue="medio">
            <SelectTrigger id="education">
              <SelectValue placeholder="Selecione a escolaridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
              <SelectItem value="medio">Ensino Médio</SelectItem>
              <SelectItem value="tecnico">Ensino Técnico</SelectItem>
              <SelectItem value="superior">Ensino Superior</SelectItem>
              <SelectItem value="pos">Pós-graduação</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experience">Experiência</Label>
          <Select defaultValue="1ano">
            <SelectTrigger id="experience">
              <SelectValue placeholder="Selecione a experiência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nenhuma">Não exigida</SelectItem>
              <SelectItem value="6meses">Até 6 meses</SelectItem>
              <SelectItem value="1ano">Até 1 ano</SelectItem>
              <SelectItem value="2anos">De 1 a 2 anos</SelectItem>
              <SelectItem value="3anos">De 2 a 3 anos</SelectItem>
              <SelectItem value="5anos">De 3 a 5 anos</SelectItem>
              <SelectItem value="5mais">Mais de 5 anos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="benefits">Benefícios (separados por vírgula)</Label>
          <Textarea id="benefits" placeholder="Ex: Vale Transporte, Vale Refeição, Plano de Saúde" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyName">Nome da Empresa</Label>
          <Input id="companyName" placeholder="Ex: Empresa XYZ" />
        </div>
      </div>
    </>
  );
  
  const renderRealEstateForm = () => (
    <>
      {renderSubcategorySelector()}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="propertyType">Tipo de Imóvel</Label>
          <Select defaultValue="apartamento">
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Selecione o tipo de imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="sobrado">Sobrado</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="cobertura">Cobertura</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="size">Área (m²)</Label>
            <Input id="size" type="number" placeholder="Ex: 70" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Dormitórios</Label>
            <Input id="bedrooms" type="number" placeholder="Ex: 2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Banheiros</Label>
            <Input id="bathrooms" type="number" placeholder="Ex: 1" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="hasGarage" />
          <Label htmlFor="hasGarage">Possui vaga de garagem</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amenities">Comodidades (separadas por vírgula)</Label>
          <Textarea id="amenities" placeholder="Ex: Piscina, Salão de Festas, Portaria 24h" />
        </div>
      </div>
    </>
  );
  
  const renderServiceForm = () => (
    <>
      {renderSubcategorySelector()}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="serviceType">Tipo de Serviço</Label>
          <Select defaultValue="residenciais">
            <SelectTrigger id="serviceType">
              <SelectValue placeholder="Selecione o tipo de serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residenciais">Serviços Residenciais</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="beleza">Beleza</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="informatica">Informática</SelectItem>
              <SelectItem value="eventos">Eventos</SelectItem>
              <SelectItem value="automotivos">Automotivos</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="availability">Disponibilidade</Label>
          <Input id="availability" placeholder="Ex: Segunda a Sexta, 8h às 18h" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experience">Experiência</Label>
          <Input id="experience" placeholder="Ex: 5 anos na área" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="providerName">Nome do Profissional</Label>
          <Input id="providerName" placeholder="Ex: João Silva" />
        </div>
      </div>
    </>
  );

  const renderSubcategorySelector = () =>
    subcategoriesOptions.length > 0 && (
      <div className="space-y-2">
        <Label htmlFor="subcategory">Subcategoria</Label>
        <Select value={subcategory} onValueChange={setSubcategory}>
          <SelectTrigger id="subcategory">
            <SelectValue placeholder="Selecione a subcategoria" />
          </SelectTrigger>
          <SelectContent>
            {subcategoriesOptions.map((subcat) => (
              <SelectItem key={subcat} value={subcat}>
                {subcat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  
  const renderFormByCategory = () => {
    switch (category) {
      case "autos":
        return renderAutoForm();
      case "empregos":
        return renderJobForm();
      case "imoveis":
        return renderRealEstateForm();
      case "servicos":
        return renderServiceForm();
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Criar Anúncio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>Preencha as informações básicas sobre o seu anúncio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select defaultValue={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>
                        Título do anúncio*
                      </Label>
                      <Input 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Honda Civic 2020 em ótimo estado" 
                        className={errors.title ? "border-destructive" : ""}
                      />
                      {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label 
                        htmlFor="price"
                        className={errors.price ? "text-destructive" : ""}
                      >
                        {category === "empregos" ? "Salário (R$)*" : "Preço (R$)*"}
                      </Label>
                      <Input 
                        id="price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number" 
                        placeholder="Ex: 50000" 
                        className={errors.price ? "border-destructive" : ""}
                      />
                      {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label 
                        htmlFor="description"
                        className={errors.description ? "text-destructive" : ""}
                      >
                        Descrição*
                      </Label>
                      <Textarea 
                        id="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva seu produto ou serviço em detalhes..." 
                        rows={5} 
                        className={errors.description ? "border-destructive" : ""}
                      />
                      {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label 
                        htmlFor="location"
                        className={errors.location ? "text-destructive" : ""}
                      >
                        Localização em Praia Grande*
                      </Label>
                      <Input 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ex: Boqueirão, Aviação, Centro" 
                        className={errors.location ? "border-destructive" : ""}
                      />
                      {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label 
                        htmlFor="contact"
                        className={errors.contact ? "text-destructive" : ""}
                      >
                        Telefone ou Email de contato*
                      </Label>
                      <Input 
                        id="contact" 
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Ex: (13) 99999-9999 ou email@exemplo.com" 
                        className={errors.contact ? "border-destructive" : ""}
                      />
                      {errors.contact && <p className="text-xs text-destructive">{errors.contact}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes Específicos</CardTitle>
                  <CardDescription>Informações específicas para a categoria selecionada</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderFormByCategory()}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Fotos</CardTitle>
                  <CardDescription>
                    Adicione até <b>6 fotos</b> reais, de alta qualidade. 
                    Cada imagem será otimizada para 350x350px e 70dpi automaticamente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader 
                    onImageSaved={handleImageSaved}
                    maxImages={6}
                  />
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-beach-600 hover:bg-beach-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Publicar Anúncio"}
                </Button>
              </div>
            </form>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Dicas para um bom anúncio</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Use um título claro e descritivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Inclua detalhes importantes na descrição</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Adicione fotos nítidas e de boa qualidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Seja honesto sobre as condições do item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Defina um preço realista para vender mais rápido</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Sobre as imagens</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Todas as imagens enviadas são automaticamente:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Redimensionadas para 350x350 pixels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Comprimidas para 70dpi (web-friendly)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-beach-600 font-semibold">•</span>
                    <span>Convertidas para Base64 e salvas na planilha</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateListing;
