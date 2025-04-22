
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

export default function Planos() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <section className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-5 text-[#f97316]">Encontre o plano perfeito para seu negócio!</h1>
          <p className="text-lg mb-2">
            Mais destaque, mais oportunidades. Anuncie em diversas categorias, aumente seu alcance e não perca clientes!
          </p>
          <p className="text-md text-muted-foreground mb-5">Escolha o plano ideal e potencialize seus resultados agora mesmo.</p>
        </section>
        <div className="grid gap-6 md:grid-cols-3">
          {/* PLANO GRÁTIS */}
          <Card>
            <CardHeader>
              <CardTitle>Grátis</CardTitle>
              <CardDescription>
                Perfeito para testes rápidos ou pequenos negócios começando agora!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-4 space-y-2">
                <li>✅ Até 3 anúncios por mês</li>
                <li>✅ Pode ser em categorias diferentes ou na mesma</li>
                <li>✅ Duração de 30 dias/anúncio</li>
              </ul>
              <div className="text-2xl font-bold mb-4">R$0/mês</div>
              <Link to="#" className="block text-center text-[#f97316] hover:underline">Selecionar</Link>
            </CardContent>
          </Card>
          {/* PLANO MÉDIO */}
          <Card>
            <CardHeader>
              <CardTitle>Profissional</CardTitle>
              <CardDescription>
                Destaque e mais flexibilidade para crescer com seu negócio!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-4 space-y-2">
                <li>✅ Até 9 anúncios/mês</li>
                <li>✅ Anuncie em até 3 categorias</li>
                <li>✅ Duração de 30 dias/anúncio</li>
              </ul>
              <div className="text-2xl font-bold mb-4">R$19/mês</div>
              <Link to="#" className="block text-center text-[#f97316] hover:underline font-medium">Quero este plano!</Link>
            </CardContent>
          </Card>
          {/* PLANO PREMIUM */}
          <Card>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>
                Máxima visibilidade e liberdade para grandes operações!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-4 space-y-2">
                <li>✅ Até 50 anúncios/mês</li>
                <li>✅ Anuncie em diversas categorias</li>
                <li>✅ Duração de 30 dias/anúncio</li>
                <li>🚀 Prioridade no atendimento</li>
              </ul>
              <div className="text-2xl font-bold mb-4">R$99/mês</div>
              <Link to="#" className="block text-center text-[#f97316] hover:underline font-medium">Quero este plano!</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
