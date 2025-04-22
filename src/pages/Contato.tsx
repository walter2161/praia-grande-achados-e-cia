
import MainLayout from "@/components/layout/MainLayout";

export default function Contato() {
  return (
    <MainLayout>
      <section className="container py-12 max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold mb-4">Contato</h1>
        <div className="space-y-2 text-lg">
          <p>
            <strong>Email:</strong> contato@guiapg.com.br
          </p>
          <p>
            <strong>Telefone:</strong> (11) 9 7469-8846
          </p>
        </div>
        <p>
          Para tirar dúvidas, fazer sugestões ou parcerias, envie-nos um e-mail e responderemos o quanto antes!
        </p>
      </section>
    </MainLayout>
  );
}
