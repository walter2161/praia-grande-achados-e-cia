
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JobForm = () => {
  return (
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
  );
};

export default JobForm;
