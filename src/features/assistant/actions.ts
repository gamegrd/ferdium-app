import PropTypes from 'prop-types';
import { createActionsFromDefinitions } from '../../actions/lib/actions';

export interface AsstantClientMessage {
  action: string;
  data: object;
}

interface AsstantActionsType {
  openDevTools: () => void;
  xgDebug: () => void;
  reload: () => void;
}

export const assistantActions =
  createActionsFromDefinitions<AsstantActionsType>(
    {
      openDevTools: {},
      xgDebug: {},
      reload: {},
    },
    PropTypes.checkPropTypes,
  );
