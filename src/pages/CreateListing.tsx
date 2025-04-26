import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { categories } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ListingBasicInfo from "@/components/listings/ListingBasicInfo";
import AutoForm from "@/components/listings/AutoForm";
import JobForm from "@/components/listings/JobForm";
import RealEstateForm from "@/components/listings/RealEstateForm";
import ServiceForm from "@/components/listings/ServiceForm";
import type { FormErrors } from "@/types";

const CreateListing = () => {
  const navigate = useNavigate();
  const { profile, isAdmin } = useAuth();
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [specificFormData, setSpecificFormData] = useState<any>({});

  useEffect(() => {
    const found = categories.find((cat) => cat.slug === category);
    setSubcategoriesOptions(found?.subcategories || []);
    setSubcategory("");
  }, [category]);

  useEffect(() => {
    if (profile?.phone) {
      setContact(profile.phone);
    } else if (profile?.email) {
      setContact(profile.email);
    }
  }, [profile]);
  
  const handleImageSaved = (imageId: string) => {
    setImageIds((prev) => [...prev, imageId]);
  };

  const handleSpecificFormDataChange = (data: any) => {
    setSpecificFormData(data);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
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
      toast("Erro de validação", {
        description: "Por favor, preencha todos os campos obrigatórios."
      });
      return;
    }

    if (!profile?.id) {
      toast("Você precisa estar logado para criar um anúncio.", {
        description: "Você precisa estar logado para criar um anúncio."
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Handle specific data for different categories
      let additionalData = {};
      
      if (category === "servicos" && specificFormData) {
        additionalData = {
          service_type: specificFormData.serviceType || null,
          availability: specificFormData.availability || null,
          experience: specificFormData.experience || null,
          provider_name: specificFormData.providerName || null
        };
      } else if (category === "autos" && specificFormData) {
        additionalData = {
          brand: specificFormData.brand || null,
          model: specificFormData.model || null,
          year: specificFormData.year ? Number(specificFormData.year) : null,
          mileage: specificFormData.mileage ? Number(specificFormData.mileage) : null,
          fuel: specificFormData.fuel || null,
          transmission: specificFormData.transmission || null,
          color: specificFormData.color || null
        };
      }
      
      const listingData = {
        title,
        price: isNaN(Number(price)) ? null : Number(price),
        description,
        images: imageIds,
        location,
        contact,
        category,
        subcategory,
        user_id: profile.id, // Explicitly set the user_id to the current user's profile id
        status: isAdmin() ? "active" : "pending",
        date: new Date().toISOString(),
        ...additionalData
      };
      
      console.log("Submitting listing data:", listingData);
      
      const { data, error } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      toast("Anúncio criado com sucesso!", {
        description: isAdmin() 
          ? "Seu anúncio foi publicado com sucesso!" 
          : "Seu anúncio será revisado pelo administrador antes de ser publicado."
      });
      
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao criar anúncio:", error);
      toast("Erro ao criar anúncio", {
        description: error instanceof Error ? error.message : "Ocorreu um erro ao processar sua solicitação."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormByCategory = () => {
    switch (category) {
      case "autos":
        return <AutoForm onFormDataChange={handleSpecificFormDataChange} />;
      case "empregos":
        return <JobForm onFormDataChange={handleSpecificFormDataChange} />;
      case "imoveis":
        return <RealEstateForm onFormDataChange={handleSpecificFormDataChange} />;
      case "servicos":
        return <ServiceForm onFormDataChange={handleSpecificFormDataChange} />;
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
                  <ListingBasicInfo 
                    title={title}
                    setTitle={setTitle}
                    price={price}
                    setPrice={setPrice}
                    description={description}
                    setDescription={setDescription}
                    location={location}
                    setLocation={setLocation}
                    contact={contact}
                    setContact={setContact}
                    category={category}
                    setCategory={setCategory}
                    subcategory={subcategory}
                    setSubcategory={setSubcategory}
                    subcategoriesOptions={subcategoriesOptions}
                    errors={errors}
                    onImageSaved={handleImageSaved}
                  />
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
