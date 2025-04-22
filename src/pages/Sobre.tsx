
import MainLayout from "@/components/layout/MainLayout";

export default function Sobre() {
  return (
    <MainLayout>
      <section className="container py-12 space-y-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Sobre Nós</h1>
        <p>
          O GuíaPG surgiu para conectar moradores e visitantes de Praia Grande aos melhores produtos, serviços e oportunidades locais. Nosso objetivo é facilitar a vida cotidiana oferecendo um guia digital confiável, fácil de usar e atualizado.
        </p>
        <p>
          Aqui, pessoas e empresas divulgam seus anúncios de forma simples, atingindo um público relevante e engajado. Conte conosco para valorizar o comércio local e aproximar você do que precisa na cidade!
        </p>
      </section>
    </MainLayout>
  );
}
