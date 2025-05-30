
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { Instagram, Youtube } from "lucide-react";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#FF6600]">GuíaPG</h3>
          <p className="text-muted-foreground mb-4">
            Seu guia local de produtos e serviços em Praia Grande.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/guiapg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#FF6600] transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://youtube.com/canalguiapg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#FF6600] transition-colors"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Categorias</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link 
                  to={`/categoria/${category.slug}`}
                  className="text-muted-foreground hover:text-beach-600 transition-colors"
                  onClick={scrollToTop}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/criar-anuncio" onClick={scrollToTop} className="text-muted-foreground hover:text-beach-600 transition-colors">
                Anunciar
              </Link>
            </li>
            <li>
              <Link to="/planos" onClick={scrollToTop} className="text-muted-foreground hover:text-beach-600 transition-colors">
                Planos
              </Link>
            </li>
            <li>
              <Link to="/perfil" onClick={scrollToTop} className="text-muted-foreground hover:text-beach-600 transition-colors">
                Meu Perfil
              </Link>
            </li>
            <li>
              <Link to="/sobre" onClick={scrollToTop} className="text-muted-foreground hover:text-beach-600 transition-colors">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/contato" onClick={scrollToTop} className="text-muted-foreground hover:text-beach-600 transition-colors">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/termos" onClick={scrollToTop} className="text-muted-foreground hover:text-beach-600 transition-colors">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/privacidade" onClick={scrollToTop} className="text-muted-foreground hover:text-beach-600 transition-colors">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Entre em Contato</h3>
          <p className="text-muted-foreground">
            Praia Grande, SP<br />
            contato@guiapg.com.br<br />
            (11) 9 7469-8846
          </p>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        <p>© 2025 GuíaPG. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
