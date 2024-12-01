import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  phone: z.string().min(9, {
    message: "Введите корректный номер телефона",
  }),
  duration: z.string({
    required_error: "Пожалуйста, выберите длительность программы",
  }),
  preferredDates: z.string().min(5, {
    message: "Укажите предпочтительные даты",
  }),
  additionalInfo: z.string().optional(),
});

export const PanchakarmaForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      duration: "",
      preferredDates: "",
      additionalInfo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Форма отправлена",
      description: "Мы свяжемся с вами для обсуждения деталей программы",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Введите ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+34 XXX XXX XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Длительность программы</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите длительность" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="14">14 дней</SelectItem>
                  <SelectItem value="21">21 день</SelectItem>
                  <SelectItem value="28">28 дней</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredDates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Предпочтительные даты</FormLabel>
              <FormControl>
                <Input placeholder="Например: Июль 2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дополнительная информация</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Опишите ваши пожелания или задайте вопросы..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Отправить заявку</Button>
      </form>
    </Form>
  );
};