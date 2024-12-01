import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-ayurveda-background">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/services" className="text-ayurveda-primary text-xl font-semibold">
          Ayurveda
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            to="/services" 
            className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors"
          >
            Главная страница
          </Link>
          <Link 
            to="/chat/dosha" 
            className="text-ayurveda-primary hover:text-ayurveda-accent transition-colors"
          >
            Определить дошу
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;