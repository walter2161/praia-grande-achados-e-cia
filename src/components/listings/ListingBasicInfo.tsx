
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/mockData";
import ImageUploader from "@/components/ImageUploader";
import { FormErrors } from "@/types";

interface ListingBasicInfoProps {
  title: string;
  setTitle: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  contact: string;
  setContact: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  subcategory: string;
  setSubcategory: (value: string) => void;
  subcategoriesOptions: string[];
  errors: FormErrors;
  onImageSaved: (imageId: string) => void;
}

const ListingBasicInfo = ({
  title,
  setTitle,
  price,
  setPrice,
  description,
  setDescription,
  location,
  setLocation,
  contact,
  setContact,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  subcategoriesOptions,
  errors,
  onImageSaved
}: ListingBasicInfoProps) => {
  return (
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

      {subcategoriesOptions.length > 0 && (
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
      )}

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
        <Label htmlFor="price" className={errors.price ? "text-destructive" : ""}>
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
        <Label htmlFor="description" className={errors.description ? "text-destructive" : ""}>
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
        <Label htmlFor="location" className={errors.location ? "text-destructive" : ""}>
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
        <Label htmlFor="contact" className={errors.contact ? "text-destructive" : ""}>
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

      <ImageUploader onImageSaved={onImageSaved} maxImages={6} />
    </div>
  );
};

export default ListingBasicInfo;
