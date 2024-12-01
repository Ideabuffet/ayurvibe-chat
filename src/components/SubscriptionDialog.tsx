import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export const SubscriptionDialog = ({ isOpen, onClose, onSubscribe }: SubscriptionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Премиум функции
          </DialogTitle>
          <DialogDescription>
            Получите доступ к расширенным возможностям всего за 99 грн в месяц
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Травяные средства
            </li>
            <li className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Диетические рекомендации
            </li>
            <li className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Хронические заболевания
            </li>
            <li className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Детокс и очищение
            </li>
            <li className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Стресс и эмоции
            </li>
            <li className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Красота и уход за кожей
            </li>
            <li className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Улучшение сна
            </li>
          </ul>
          <Button onClick={onSubscribe} className="w-full">
            Оформить подписку
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};