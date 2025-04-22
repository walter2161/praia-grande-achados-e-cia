
import MainLayout from "@/components/layout/MainLayout";

export default function Privacidade() {
  return (
    <MainLayout>
      <section className="container py-12 max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
        <p>
          Respeitamos a sua privacidade. Suas informações pessoais são coletadas apenas para permitir o funcionamento do site e contato com anunciantes, sendo tratadas com total confidencialidade.
        </p>
        <ul className="list-disc pl-8">
          <li>Não compartilhamos dados pessoais sem consentimento.</li>
          <li>Utilizamos cookies apenas para melhorar a navegação.</li>
          <li>Você pode solicitar a remoção dos seus dados entrando em contato conosco.</li>
        </ul>
      </section>
    </MainLayout>
  );
}
