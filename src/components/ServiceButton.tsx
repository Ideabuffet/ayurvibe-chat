import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ServiceButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  color: string;
}

export const ServiceButton = ({ icon: Icon, label, onClick, color }: ServiceButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 h-32 w-full bg-white hover:bg-ayurveda-accent/5 text-ayurveda-text border border-ayurveda-accent/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-4"
      variant="outline"
    >
      <Icon strokeWidth={1.5} className="w-16 h-16" style={{ color }} />
      <span className="text-xl font-medium text-center font-sans whitespace-pre-line leading-tight">{label}</span>
    </Button>
  );
};