
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AutoForm = () => {
  return (
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
  );
};

export default AutoForm;
