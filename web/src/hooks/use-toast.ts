import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
};

function toast({ title, description }: ToastProps) {
  sonnerToast(title, { description });
}

function useToast() {
  return { toast };
}

export { useToast, toast };