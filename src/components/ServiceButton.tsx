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
      className="flex flex-col items-center justify-center gap-2 h-32 w-full bg-white hover:bg-ayurveda-accent/10 text-ayurveda-text border border-ayurveda-accent/20"
      variant="outline"
    >
      <Icon className="w-8 h-8 text-ayurveda-primary" />
      <span className="text-sm font-medium text-center">{label}</span>
    </Button>
  );
};