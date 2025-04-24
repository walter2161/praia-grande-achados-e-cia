
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/mockData";

interface ServiceFormProps {
  onFormDataChange?: (data: any) => void;
}

const ServiceForm = ({ onFormDataChange }: ServiceFormProps) => {
  const serviceCategories = categories.find(cat => cat.slug === "servicos")?.subcategories || [];
  const [serviceType, setServiceType] = useState("");
  const [availability, setAvailability] = useState("");
  const [experience, setExperience] = useState("");
  const [providerName, setProviderName] = useState("");
  
  // Update parent form data when any field changes
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange({
        serviceType,
        availability,
        experience,
        providerName
      });
    }
  }, [serviceType, availability, experience, providerName, onFormDataChange]);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="serviceType">Tipo de Serviço</Label>
        <Select value={serviceType} onValueChange={(value) => {
          setServiceType(value);
        }}>
          <SelectTrigger id="serviceType">
            <SelectValue placeholder="Selecione o tipo de serviço" />
          </SelectTrigger>
          <SelectContent>
            {serviceCategories.map((subcat) => (
              <SelectItem key={subcat} value={subcat}>
                {subcat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="availability">Disponibilidade</Label>
        <Input 
          id="availability" 
          placeholder="Ex: Segunda a Sexta, 8h às 18h" 
          value={availability}
          onChange={(e) => {
            setAvailability(e.target.value);
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Experiência</Label>
        <Input 
          id="experience" 
          placeholder="Ex: 5 anos na área" 
          value={experience}
          onChange={(e) => {
            setExperience(e.target.value);
          }}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="providerName">Nome do Profissional</Label>
        <Input 
          id="providerName" 
          placeholder="Ex: João Silva" 
          value={providerName}
          onChange={(e) => {
            setProviderName(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ServiceForm;
