
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const RealEstateForm = () => {
  return (
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
  );
};

export default RealEstateForm;
