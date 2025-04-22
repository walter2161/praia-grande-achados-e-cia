
import { JobListing } from "@/types";

export const jobListings: JobListing[] = [
  {
    id: "job1",
    title: "Assistente Administrativo",
    salary: 1800,
    description: "Empresa do setor de logística busca assistente administrativo com experiência em rotinas de escritório e conhecimento em Excel.",
    images: ["/placeholder.svg"],
    location: "Centro, Praia Grande",
    date: "2023-04-21",
    companyName: "LogTrans Ltda",
    companyContact: "rh@logtrans.com.br",
    category: "empregos",
    jobType: "CLT",
    education: "Ensino Médio Completo",
    experience: "Mínimo 1 ano",
    benefits: ["Vale Transporte", "Vale Refeição", "Plano de Saúde"]
  }
  // ... adicione mais vagas conforme necessário
];
