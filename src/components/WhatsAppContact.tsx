
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MessageCircle } from "lucide-react";

type WhatsAppContactProps = {
  rawPhone?: string;
  listingTitle?: string;
};

function maskPhone(phone: string) {
  // Mantém o formato: (13) 9****-****
  return phone.replace(/(\(\d{2}\)\s?\d)\d{4}-\d{4}/, "$1 ****-****");
}

function isValidPhone(contact: string | undefined): boolean {
  if (!contact) return false;
  // Check if contact contains numbers and common phone formatting
  return /\d/.test(contact) && !contact.includes('@');
}

const WhatsAppContact: React.FC<WhatsAppContactProps> = ({
  rawPhone,
  listingTitle = "",
}) => {
  const { isAuthenticated } = useAuth();
  
  // If no contact or if it's an email, don't show WhatsApp component
  if (!rawPhone || !isValidPhone(rawPhone)) return null;

  // Extrair apenas os dígitos do telefone para montar o link do WhatsApp
  const onlyDigits = rawPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/55${onlyDigits}?text=${encodeURIComponent(
    `Olá! Tenho interesse no anúncio: "${listingTitle}"`
  )}`;

  return (
    <div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <MessageCircle className="inline-block mr-1 h-4 w-4 text-green-600" />
          <span className="text-muted-foreground font-medium">WhatsApp</span>
        </div>
        {isAuthenticated() ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:underline font-semibold"
          >
            {rawPhone}
          </a>
        ) : (
          <span className="font-mono">{maskPhone(rawPhone)}</span>
        )}
      </div>
      {!isAuthenticated() && (
        <div className="text-xs text-muted-foreground mt-1">
          Faça <a href="/login" className="underline text-beach-600 hover:text-beach-700">login</a> ou &nbsp;
          <a href="/login" className="underline text-beach-600 hover:text-beach-700">cadastre-se</a> para ver o WhatsApp completo.
        </div>
      )}
    </div>
  );
};

export default WhatsAppContact;
