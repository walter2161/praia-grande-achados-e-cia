
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="container py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-bold text-beach-600">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
        <Link to="/">
          <Button className="gap-2 bg-beach-600 hover:bg-beach-700">
            <Home className="h-4 w-4" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
