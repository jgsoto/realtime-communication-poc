import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../api/products";

export default function useProducts() {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addMutation = useMutation({
    mutationFn: addProduct,

    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  const refreshProducts = () => {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  };

  return {
    products: data,
    isLoading,
    isError,

    addMutation,
    deleteMutation,

    refreshProducts,
  };
}