import { useMutation, useQueryClient } from 'react-query';
import { projectApis } from '../api/project';

export function useRejectApply() {
  const queryClient = useQueryClient();
  return useMutation((data) => projectApis.rejectApply(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('applyList');
      queryClient.invalidateQueries('detailPost');
    },
  });
}

export function useAcceptApply() {
  const queryClient = useQueryClient();
  return useMutation((data) => projectApis.acceptApply(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('applyList');
      queryClient.invalidateQueries('detailPost');
    },
  });
}

export function useExplusionMateMutation() {
  const queryClient = useQueryClient();
  return useMutation((data) => projectApis.explusionMate(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('teamList');
      queryClient.invalidateQueries('detailPost');
    },
  });
}
