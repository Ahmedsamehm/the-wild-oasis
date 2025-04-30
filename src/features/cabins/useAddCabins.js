import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddCabinFun } from '../../services/CabinsApi';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

function useAddCabins() {
  const queryClient = useQueryClient();
  const { reset } = useForm();
  const { mutate: AddCabins, isPending: isAddLoading } = useMutation({
    mutationFn: AddCabinFun,
    onSuccess: () => {
      toast.success('Cabin added successfully');
      queryClient.invalidateQueries(['cabins']);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to add cabin');
    },
  });

  return { AddCabins, isAddLoading };
}

export default useAddCabins;
