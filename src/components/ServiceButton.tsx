import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ServiceButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const ServiceButton = ({ icon: Icon, label, onClick }: ServiceButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 h-36 w-full bg-white hover:bg-ayurveda-accent/5 text-ayurveda-text border border-ayurveda-accent/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      variant="outline"
    >
      <Icon className="w-8 h-8 text-ayurveda-primary" />
      <span className="text-sm font-medium text-center font-sans">{label}</span>
    </Button>
  );
};