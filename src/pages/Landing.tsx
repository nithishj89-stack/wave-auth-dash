import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="text-center space-y-8 fade-in">
        <div className="float space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            NexusApp
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">
            Your Gateway to Modern Excellence
          </p>
        </div>
        
        <Button
          onClick={() => navigate("/login")}
          size="lg"
          className="text-lg px-8 py-6 rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl glow"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Landing;
