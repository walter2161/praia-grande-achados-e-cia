
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">PraiaGrande Achados&Cia</h3>
          <p className="text-muted-foreground mb-4">
            Seu guia local de produtos e serviços em Praia Grande.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Categorias</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link 
                  to={`/categoria/${category.slug}`}
                  className="text-muted-foreground hover:text-beach-600 transition-colors"
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
              <Link to="/sobre" className="text-muted-foreground hover:text-beach-600 transition-colors">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/contato" className="text-muted-foreground hover:text-beach-600 transition-colors">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/termos" className="text-muted-foreground hover:text-beach-600 transition-colors">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/privacidade" className="text-muted-foreground hover:text-beach-600 transition-colors">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Entre em Contato</h3>
          <p className="text-muted-foreground">
            Praia Grande, SP<br />
            contato@praiagrande-achados.com<br />
            (13) 99999-9999
          </p>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        <p>© 2023 PraiaGrande Achados&Cia. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
