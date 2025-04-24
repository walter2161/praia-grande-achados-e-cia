
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ListingDetail from "./pages/ListingDetail";
import CreateListing from "./pages/CreateListing";
import AllListings from "./pages/AllListings";
import NotFound from "./pages/NotFound";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Planos from "./pages/Planos";
import Error404 from "./pages/Error404";

// Protected route component that uses the auth context
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  // If authenticated, render the element, otherwise redirect to login
  return isAuthenticated() ? element : <Navigate to="/login?redirect=/criar-anuncio" />;
};

// We need this wrapper since useAuth must be used within AuthProvider
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/categoria/:slug" element={<CategoryPage />} />
      <Route path="/anuncio/:categorySlug/:id" element={<ListingDetail />} />
      <Route path="/criar-anuncio" element={<ProtectedRoute element={<CreateListing />} />} />
      <Route path="/todos-anuncios" element={<AllListings />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
