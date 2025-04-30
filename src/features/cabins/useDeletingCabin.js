import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCabin } from '../../services/CabinsApi';
import toast from 'react-hot-toast';

function useDeletingCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: OnClickDeleteCabin } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Deleted Cabin');
    },
    onError: (error) => {
      toast.error('Delete failed: ' + error.message);
    },
  });
  return { isDeleting, OnClickDeleteCabin };
}

export default useDeletingCabin;
