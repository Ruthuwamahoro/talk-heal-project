import { createResources } from "@/services/resources/createResource";
import showToast from "@/utils/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const initialData = {
    title: "",
    description: "",
    coverImage: "",
    resourceType: "",
    content: "",
    url: "",
    thumbnailUrl: "",
    duration: 0,
    category: "",
    tags: "",
    isSaved: "",
    difficultyLevel: ""
}

export const useCreateResource = async() => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [ errors, setErrors] = useState<Record<string, string>>({});
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createResources,
        onSuccess: (response) => {
                queryClient.invalidateQueries();
            setFormData(initialData);
            setErrors({});
            showToast(response.message, "success");
      
        },
        onError: (err: unknown) => {
            const error = err as Error;
            const errorMessage = error.message || "An error occured";
            showToast(errorMessage, "error");
        }

        
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
          setErrors(prev => {
            const { [id]: _, ...rest } = prev;
            return rest;
          });
        }
    };
    
    const handleSubmit = () => {
        try {
          mutate(formData);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors = error.errors.reduce(
              (acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
              },
              {} as Record<string, string>
            );
            setErrors(fieldErrors);
          }
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        isPending,
      };

}