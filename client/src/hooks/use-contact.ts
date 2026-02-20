import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useContactSubmission() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      await fetch("https://script.google.com/macros/s/AKfycbx9nCLtx5qgFkArizmrqh9mCshJVB2Vk2ieue1nMTEngcQE60DzL7Sb3_wevNJGhvyh7w/exec", {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      return { success: true };
    },

    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you shortly.",
      });
    },

    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    },
  });
}
