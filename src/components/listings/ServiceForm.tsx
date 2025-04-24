
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ServiceForm = () => {
  return (
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
  );
};

export default ServiceForm;
