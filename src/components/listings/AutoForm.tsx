
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AutoFormProps {
  onFormDataChange?: (data: any) => void;
}

const AutoForm = ({ onFormDataChange }: AutoFormProps) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("flex");
  const [transmission, setTransmission] = useState("automatico");
  const [color, setColor] = useState("");

  // Update parent form data when any field changes
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange({
        brand,
        model,
        year,
        mileage,
        fuel,
        transmission,
        color
      });
    }
  }, [brand, model, year, mileage, fuel, transmission, color, onFormDataChange]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Marca</Label>
          <Input 
            id="brand" 
            placeholder="Ex: Toyota, Honda, Volkswagen" 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Modelo</Label>
          <Input 
            id="model" 
            placeholder="Ex: Corolla, Civic, Gol" 
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Ano</Label>
          <Input 
            id="year" 
            type="number" 
            placeholder="Ex: 2020" 
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mileage">Quilometragem</Label>
          <Input 
            id="mileage" 
            type="number" 
            placeholder="Ex: 45000" 
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fuel">Combustível</Label>
          <Select value={fuel} onValueChange={setFuel}>
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
          <Select value={transmission} onValueChange={setTransmission}>
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
        <Input 
          id="color" 
          placeholder="Ex: Prata, Preto, Branco" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AutoForm;
