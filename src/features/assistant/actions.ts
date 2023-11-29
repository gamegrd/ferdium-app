import PropTypes from 'prop-types';
import { createActionsFromDefinitions } from '../../actions/lib/actions';

export interface AsstantClientMessage {
  action: string;
  data: object;
}

interface AsstantActionsType {
  openDevTools: () => void;
  xgDebug: () => void;
}

export const asstantActions = createActionsFromDefinitions<AsstantActionsType>(
  {
    openDevTools: {},
    xgDebug: {},
  },
  PropTypes.checkPropTypes,
);
