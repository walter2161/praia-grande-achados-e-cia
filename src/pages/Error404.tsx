
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const Error404 = () => {
  return (
    <MainLayout>
      <div className="container py-16 flex flex-col items-center justify-center text-center">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-9xl font-bold text-beach-600">404</h1>
          <h2 className="text-3xl font-semibold">Sumiu! Como um PG no último andar... 🏙️🔍</h2>
          <p className="text-lg text-muted-foreground">
            A página que você quer tá mais escondida que kitnet barata no centro! Mas relaxa:
          </p>
          <ul className="text-left space-y-2 list-none pl-4">
            <li className="flex items-center gap-2">
              <span className="text-beach-600">🔹</span> Volte para o mapa principal (página inicial)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-beach-600">🔹</span> Navegue pelos melhores PGs de 2024
            </li>
            <li className="flex items-center gap-2">
              <span className="text-beach-600">🔹</span> Grude no nosso Instagram @guiapg pra não perder nada!
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/">
              <Button className="gap-2 bg-beach-600 hover:bg-beach-700">
                <Home className="h-4 w-4" />
                Vem de volta!
              </Button>
            </Link>
            <a href="mailto:contato@guiapg.com.br">
              <Button variant="outline">
                Reportar problema
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            * Ou nos chama no contato@guiapg.com.br se o sumiço for mistério. *
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Error404;
