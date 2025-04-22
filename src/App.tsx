
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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

// Protected route component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  // Check if user is logged in by looking for the user in localStorage
  const isAuthenticated = localStorage.getItem("guiapg_user") !== null;
  
  // If authenticated, render the element, otherwise redirect to login
  return isAuthenticated ? element : <Navigate to="/login?redirect=/criar-anuncio" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
