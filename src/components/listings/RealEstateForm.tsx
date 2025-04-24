
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface RealEstateFormProps {
  onFormDataChange?: (data: any) => void;
}

const RealEstateForm = ({ onFormDataChange }: RealEstateFormProps) => {
  const [propertyType, setPropertyType] = useState("apartamento");
  const [size, setSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [hasGarage, setHasGarage] = useState(false);
  const [amenities, setAmenities] = useState("");

  // Update parent form data when any field changes
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange({
        propertyType,
        size: size ? Number(size) : null,
        bedrooms: bedrooms ? Number(bedrooms) : null,
        bathrooms: bathrooms ? Number(bathrooms) : null,
        hasGarage,
        amenities
      });
    }
  }, [propertyType, size, bedrooms, bathrooms, hasGarage, amenities, onFormDataChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="propertyType">Tipo de Imóvel</Label>
        <Select value={propertyType} onValueChange={setPropertyType}>
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
          <Input 
            id="size" 
            type="number" 
            placeholder="Ex: 70" 
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Dormitórios</Label>
          <Input 
            id="bedrooms" 
            type="number" 
            placeholder="Ex: 2" 
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Banheiros</Label>
          <Input 
            id="bathrooms" 
            type="number" 
            placeholder="Ex: 1" 
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="hasGarage" 
          checked={hasGarage}
          onCheckedChange={setHasGarage}
        />
        <Label htmlFor="hasGarage">Possui vaga de garagem</Label>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amenities">Comodidades (separadas por vírgula)</Label>
        <Textarea 
          id="amenities" 
          placeholder="Ex: Piscina, Salão de Festas, Portaria 24h" 
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RealEstateForm;
