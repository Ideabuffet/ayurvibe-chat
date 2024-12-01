import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  color?: string;
  isActive?: boolean;
}

export const ServiceButton = ({
  icon: Icon,
  label,
  onClick,
  color = "#4A5D4F",
  isActive = false
}: ServiceButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full h-auto py-6 flex flex-col items-center gap-4 transition-all duration-200",
        isActive && "bg-ayurveda-accent/10 border-ayurveda-accent"
      )}
      onClick={onClick}
    >
      <Icon size={32} style={{ color }} />
      <span className="text-base font-medium" style={{ color }}>
        {label}
      </span>
    </Button>
  );
};