import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { upDateSetting } from '../../services/SettingApi';

function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: EditSetting, isPending: isSettingLoading } = useMutation({
    mutationFn: (newSetting) => upDateSetting(newSetting),
    onSuccess: () => {
      toast.success('Setting updated successfully');
      queryClient.invalidateQueries(['Settings']);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update Setting');
    },
  });
  return { EditSetting, isSettingLoading };
}

export default useEditSetting;
