
import { useEffect, useState } from "react";
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

  const [mainImage, setMainImage] = useState(0);
  
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
  
  if ("sellerName" in listing && listing.sellerName) {
    contactName = listing.sellerName as string;
    contactInfo = (listing.sellerContact || "") as string;
  } else if ("company_name" in listing && listing.company_name) {
    contactName = listing.company_name;
    contactInfo = listing.company_contact || "";
  } else if ("provider_name" in listing && listing.provider_name) {
    contactName = listing.provider_name;
    contactInfo = listing.provider_contact || "";
  }
  
  // Determine which price to display based on listing type
  let displayPrice;
  let priceLabel = "Preço:";
  
  if ("salary" in listing && listing.salary !== null) {
    displayPrice = formatPrice(listing.salary);
    priceLabel = "Salário:";
  } else if (listing.price_description) {
    displayPrice = listing.price_description;
  } else if (listing.price !== null) {
    displayPrice = formatPrice(listing.price as number);
  }

  // Para evitar erro se não houver imagens
  const validImages = listing.images.filter(Boolean).slice(0, 6);
  
  // Definindo o caminho da imagem placeholder
  const placeholderImage = "/lovable-uploads/389511f0-a13a-4a75-bf54-d91d60c4a762.png";
  
  // Map section for any listing type
  let mapSection = null;
  
  // For bars and restaurants with specific coordinates
  if (
    categorySlug === "bares-restaurantes" &&
    "address" in listing &&
    "latitude" in listing &&
    "longitude" in listing
  ) {
    mapSection = (
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
          zoom={15}
          category={categorySlug}
          address={listing.address}
        />
        <div className="mt-2 text-sm text-muted-foreground">{listing.address}</div>
      </div>
    );
  } 
  // For service listings - exact location
  else if (categorySlug === "servicos" && "location" in listing) {
    const serviceLat = -24.0078;
    const serviceLng = -46.4121;
    mapSection = (
      <div className="my-8">
        <h2 className="text-lg font-semibold mb-3 text-beach-700">Localização do serviço:</h2>
        <Map
          pins={[
            {
              latitude: serviceLat,
              longitude: serviceLng,
              title: listing.title,
            },
          ]}
          height="300px"
          zoom={15}
          category={categorySlug}
          address={`${listing.title} - ${listing.location}, Praia Grande, SP`}
        />
        <div className="mt-2 text-sm text-muted-foreground">{listing.location}</div>
      </div>
    );
  }
  // For all other listings - neighborhood only
  else if (listing.location) {
    mapSection = (
      <div className="my-8">
        <h2 className="text-lg font-semibold mb-3 text-beach-700">Localização aproximada:</h2>
        <Map
          pins={[
            {
              latitude: -24.0078,
              longitude: -46.4121,
              title: listing.location,
            },
          ]}
          height="300px"
          zoom={14}
          category={categorySlug}
          neighborhood={listing.location}
        />
        <div className="mt-2 text-sm text-muted-foreground">
          Região: {listing.location}
          <span className="ml-2 text-xs text-beach-500">(Localização aproximada por segurança)</span>
        </div>
      </div>
    );
  }

  // Extract experience for service listings
  const experienceValue = "experience" in listing ? listing.experience : null;

  // Extract benefits for job listings
  const benefitsValue = "benefits" in listing ? listing.benefits : null;

  // Extract amenities for real estate listings
  const amenitiesValue = "amenities" in listing ? listing.amenities : null;

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

            {/* Galeria de imagens customizada */}
            <div className="w-full flex flex-col md:flex-row gap-4 items-start">
              {/* Thumbnails - vertical no desktop, horizontal no mobile */}
              <div className="flex md:flex-col flex-row gap-2 md:gap-2 md:mr-2">
                {validImages.slice(0, 6).map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    aria-label={`Ver imagem ${idx + 1}`}
                    className={`w-[78px] h-[78px] md:w-[130px] md:h-[130px] flex items-center justify-center border rounded-md overflow-hidden
                      ${mainImage === idx ? "ring-2 ring-beach-400 border-beach-500" : "border-muted"}
                      bg-white transition-all`}
                    style={{ aspectRatio: "1/1", minWidth: 78, minHeight: 78, maxWidth: 130, maxHeight: 130 }}
                    onClick={() => setMainImage(idx)}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1} de ${listing.title}`}
                      className="object-cover w-full h-full"
                      style={{ width: "100%", height: "100%", maxWidth: 130, maxHeight: 130 }}
                      loading="lazy"
                      onError={(e) => {
                        // Se a imagem falhar ao carregar, use o placeholder
                        const target = e.target as HTMLImageElement;
                        if (target.src !== placeholderImage) {
                          console.log("Image failed to load, using placeholder instead");
                          target.src = placeholderImage;
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
              {/* Área principal da foto */}
              <div
                className="w-full max-w-[420px] aspect-square bg-muted rounded-lg overflow-hidden border mx-auto flex items-center justify-center"
                style={{
                  width: "100%",
                  maxWidth: 420,
                  minWidth: 220,
                  aspectRatio: "1/1",
                  height: "auto",
                }}
              >
                <img
                  src={validImages[mainImage] || placeholderImage}
                  alt={`${listing.title} imagem ${mainImage + 1}`}
                  className="w-full h-full object-cover"
                  style={{ maxWidth: 420, maxHeight: 420, aspectRatio: "1/1" }}
                  onError={(e) => {
                    // Se a imagem falhar ao carregar, use o placeholder
                    const target = e.target as HTMLImageElement;
                    if (target.src !== placeholderImage) {
                      console.log("Image failed to load, using placeholder instead");
                      target.src = placeholderImage;
                    }
                  }}
                />
              </div>
            </div>

            {/* Add the map section here */}
            {mapSection}
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Descrição</h2>
              <p className="whitespace-pre-line">{listing.description}</p>
            </div>
            
            {/* Render specific details based on listing type */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Detalhes</h2>
              
              {/* Auto listing details */}
              {"brand" in listing && listing.brand && (
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
                    <p className="font-medium">{listing.mileage?.toLocaleString()} km</p>
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
              {"job_type" in listing && listing.job_type && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de contrato:</p>
                    <p className="font-medium">{listing.job_type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Escolaridade:</p>
                    <p className="font-medium">{listing.education}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Experiência:</p>
                    <p className="font-medium">{experienceValue}</p>
                  </div>
                  {benefitsValue && (
                    <div className="space-y-1 col-span-2">
                      <p className="text-sm text-muted-foreground">Benefícios:</p>
                      <p className="font-medium">{benefitsValue.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Real estate listing details */}
              {"property_type" in listing && listing.property_type && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de imóvel:</p>
                    <p className="font-medium">{listing.property_type}</p>
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
                    <p className="font-medium">{listing.has_garage ? "Sim" : "Não"}</p>
                  </div>
                  {amenitiesValue && (
                    <div className="space-y-1 col-span-2">
                      <p className="text-sm text-muted-foreground">Comodidades:</p>
                      <p className="font-medium">{amenitiesValue.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Service listing details */}
              {"service_type" in listing && listing.service_type && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo de serviço:</p>
                    <p className="font-medium">{listing.service_type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Disponibilidade:</p>
                    <p className="font-medium">{listing.availability}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Experiência:</p>
                    <p className="font-medium">{experienceValue}</p>
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

              {/* WHATSAPP CONTACTO VISÍVEL PARA TODOS INCLUINDO EMPREGOS */}
              <WhatsAppContact rawPhone={contactInfo} listingTitle={listing.title} />
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
