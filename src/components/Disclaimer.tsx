import { DisclaimerProps } from "@/types/dosha";

export const Disclaimer = ({ className }: DisclaimerProps) => {
  return (
    <div className={className}>
      <p className="text-sm text-ayurveda-text/60">
        Этот тест предназначен только для общего ознакомления с вашей конституцией и не заменяет консультацию специалиста по аюрведе.
      </p>
    </div>
  );
};