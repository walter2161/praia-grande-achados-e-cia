
import MainLayout from "@/components/layout/MainLayout";

export default function Termos() {
  return (
    <MainLayout>
      <section className="container py-12 max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold mb-4">Termos de Uso</h1>
        <p>
          Ao acessar ou utilizar o GuíaPG, você concorda com nossos Termos de Uso. Leia cuidadosamente as regras para publicação de anúncios, privacidade de dados e responsabilidades das partes envolvidas.
        </p>
        <ul className="list-disc pl-8">
          <li>É proibido publicar conteúdo ilegal ou impróprio.</li>
          <li>Os anúncios são de responsabilidade dos anunciantes.</li>
          <li>Nos reservamos o direito de remover conteúdos que violem as diretrizes.</li>
        </ul>
        <p>Para dúvidas, por favor, entre em contato.</p>
      </section>
    </MainLayout>
  );
}
