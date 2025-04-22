import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ArrowLeft,
  Car,
  Briefcase,
  House,
  Settings
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Map from "@/components/Map";
import { allListings, categories } from "@/data/mockData";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import WhatsAppContact from "@/components/WhatsAppContact";

const getCategoryIcon = (categorySlug: string) => {
  switch (categorySlug) {
    case "autos":
      return Car;
    case "empregos":
      return Briefcase;
    case "imoveis":
      return House;
    case "servicos":
      return Settings;
    default:
      return null;
  }
};

const formatPrice = (price: number | string) => {
  if (typeof price === "number") {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return price;
};

const ListingDetail = () => {
  const { categorySlug, id } = useParams<{ categorySlug: string; id: string }>();
  const listing = allListings.find(item => item.id === id && item.category === categorySlug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!listing) {
    return (
      <MainLayout>
        <div className="container py-12">
          <h1 className="text-3xl font-bold mb-6">Anúncio não encontrado</h1>
          <Link to="/">
            <Button variant="link" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para página inicial
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const category = categories.find(cat => cat.slug === categorySlug);
  const CategoryIcon = getCategoryIcon(categorySlug || "");
  
  const formattedDate = format(parseISO(listing.date), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  
  const timeAgo = formatDistanceToNow(parseISO(listing.date), {
    addSuffix: true,
    locale: ptBR,
  });
  
  // Determine which contact info to show based on listing type
  let contactName = "";
  let contactInfo = "";
  
  if ("sellerName" in listing) {
    contactName = listing.sellerName;
    contactInfo = listing.sellerContact;
  } else if ("companyName" in listing) {
    contactName = listing.companyName;
    contactInfo = listing.companyContact;
  } else if ("providerName" in listing) {
    contactName = listing.providerName;
    contactInfo = listing.providerContact;
  }
  
  // Determine which price to display based on listing type
  let displayPrice;
  let priceLabel = "Preço:";
  
  if ("salary" in listing) {
    displayPrice = formatPrice(listing.salary);
    priceLabel = "Salário:";
  } else {
    displayPrice = formatPrice(listing.price);
  }

  // Map section para bares e restaurantes
  let barMapSection = null;
  if (
    categorySlug === "bares-restaurantes" &&
    "address" in listing &&
    "latitude" in listing &&
    "longitude" in listing
  ) {
    barMapSection = (
      <div className="my-8">
        <h2 className="text-lg font-semibold mb-3 text-beach-700">Localização no mapa:</h2>
        <Map
          pins={[
            {
              latitude: listing.latitude,
              longitude: listing.longitude,
              title: listing.title,
            },
          ]}
          height="300px"
          initialCenter={[listing.longitude, listing.latitude]}
          zoom={15}
        />
        <div className="mt-2 text-sm text-muted-foreground">{listing.address}</div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <Link to={categorySlug ? `/categoria/${categorySlug}` : "/"}>
          <Button variant="link" className="pl-0 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para {category?.name || "página inicial"}
          </Button>
        </Link>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left column - Main info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {CategoryIcon && (
                  <CategoryIcon className="h-5 w-5 text-beach-600" />
                )}
                <span className="text-sm font-medium text-beach-600">
                  {category?.name || categorySlug}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{listing.title}</h1>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span title={formattedDate}>{timeAgo}</span>
                </div>
              </div>
            </div>
            
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={listing.images[0] || "/placeholder.svg"}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Mostrar mapa para bares e restaurantes */}
            {barMapSection}
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Descrição</h2>
              <p className="whitespace-pre-line">{listing.description}</p>
            </div>
            
            {/* Render specific details based on listing type */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Detalhes</h2>
              
              {/* Auto listing details */}
              {"brand" in listing && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Marca:</p>
                    <p className="font-medium">{listing.brand}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Modelo:</p>
                    <p className="font-medium">{listing.model}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Ano:</p>
                    <p className="font-medium">{listing.year}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Quilometragem:</p>
                    <p className="font-medium">{listing.mileage.toLocaleString()} km</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Combustível:</p>
                    <p className="font-medium">{listing.fuel}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Câmbio:</p>
                    <p className="font-medium">{listing.transmission}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Cor:</p>
                    <p className="font-medium">{listing.color}</p>
                  </div>
                </div>
              )}
              
              {/* Job listing details */}
              {"jobType" in listing && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de contrato:</p>
                    <p className="font-medium">{listing.jobType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Escolaridade:</p>
                    <p className="font-medium">{listing.education}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Experiência:</p>
                    <p className="font-medium">{listing.experience}</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-sm text-muted-foreground">Benefícios:</p>
                    <p className="font-medium">{listing.benefits.join(", ")}</p>
                  </div>
                </div>
              )}
              
              {/* Real estate listing details */}
              {"propertyType" in listing && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de imóvel:</p>
                    <p className="font-medium">{listing.propertyType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Área:</p>
                    <p className="font-medium">{listing.size} m²</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Dormitórios:</p>
                    <p className="font-medium">{listing.bedrooms}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Banheiros:</p>
                    <p className="font-medium">{listing.bathrooms}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Garagem:</p>
                    <p className="font-medium">{listing.hasGarage ? "Sim" : "Não"}</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-sm text-muted-foreground">Comodidades:</p>
                    <p className="font-medium">{listing.amenities.join(", ")}</p>
                  </div>
                </div>
              )}
              
              {/* Service listing details */}
              {"serviceType" in listing && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de serviço:</p>
                    <p className="font-medium">{listing.serviceType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Disponibilidade:</p>
                    <p className="font-medium">{listing.availability}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Experiência:</p>
                    <p className="font-medium">{listing.experience}</p>
                  </div>
                  {listing.rating && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Avaliação:</p>
                      <p className="font-medium">{listing.rating} / 5</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <p className="text-lg mb-2">{priceLabel}</p>
              <p className="text-3xl font-bold text-beach-700 mb-4">{displayPrice}</p>
              
              <Separator className="my-4" />

              <p className="font-medium mb-2">Contato:</p>
              <p className="mb-2">{contactName}</p>

              {/* WHATSAPP CONTACTO VISÍVEL PARA TODOS */}
              <WhatsAppContact rawPhone={contactInfo} listingTitle={listing.title} />

              <div className="space-y-3 mt-4">
                {/* Mantém os botões de telefone/email gerais */}
                <Button className="w-full gap-2 bg-beach-600 hover:bg-beach-700">
                  <Phone className="h-4 w-4" />
                  {contactInfo.includes('@') ? "Enviar mensagem" : "Ligar"}
                </Button>
                <Button className="w-full gap-2" variant="outline">
                  <Mail className="h-4 w-4" />
                  Enviar e-mail
                </Button>
              </div>
            </div>
            
            <div className="bg-beach-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Dicas de segurança</h3>
              <ul className="text-sm space-y-2">
                <li>• Não pague adiantado</li>
                <li>• Veja o produto pessoalmente</li>
                <li>• Verifique a qualidade do produto</li>
                <li>• Saiba mais sobre o vendedor</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <p className="font-medium mb-2">ID do anúncio:</p>
              <p className="text-muted-foreground">{listing.id}</p>
              <p className="font-medium mt-4 mb-2">Publicado em:</p>
              <p className="text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingDetail;
