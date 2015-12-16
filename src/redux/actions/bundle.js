import * as api from '../../utils/apiClient';

export const JOINT_CLICK = 'JOINT_CLICK';

export default function joint(value) {
  return {
    type: JOINT_CLICK,
    value,
  }
}
