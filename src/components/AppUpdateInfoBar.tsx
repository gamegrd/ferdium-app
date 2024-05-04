import { defineMessages, useIntl } from 'react-intl';

import { mdiInformation } from '@mdi/js';
import type { MouseEventHandler } from 'react';
import InfoBar from './ui/InfoBar';
import Icon from './ui/icon';

import { isWinPortable } from '../environment';
import { onAuthGoToReleaseNotes } from '../helpers/update-helpers';

const messages = defineMessages({
  updateAvailable: {
    id: 'infobar.updateAvailable',
    defaultMessage: 'A new update for RuyiAI is available.',
  },
  changelog: {
    id: 'infobar.buttonChangelog',
    defaultMessage: 'What is new?',
  },
  buttonInstallUpdate: {
    id: 'infobar.buttonInstallUpdate',
    defaultMessage: 'Restart & install update',
  },
});

export interface IProps {
  onInstallUpdate: MouseEventHandler<HTMLButtonElement>;
  onHide: () => void;
  updateVersionParsed: string;
}

const AppUpdateInfoBar = (props: IProps) => {
  const { onInstallUpdate, updateVersionParsed, onHide } = props;
  const intl = useIntl();

  return (
    <InfoBar
      type="primary"
      ctaLabel={intl.formatMessage(messages.buttonInstallUpdate)}
      onClick={event => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !isWinPortable && onInstallUpdate(event);
      }}
      onHide={onHide}
    >
      <Icon icon={mdiInformation} />
      <p style={{ padding: '0 0.5rem 0 1rem' }}>
        {intl.formatMessage(messages.updateAvailable)}
      </p>
      <button
        className="info-bar__inline-button"
        type="button"
        onClick={() => {
          window.location.href = onAuthGoToReleaseNotes(
            window.location.href,
            updateVersionParsed,
          );
        }}
      >
        <u>{intl.formatMessage(messages.changelog)}</u>
      </button>
    </InfoBar>
  );
};

export default AppUpdateInfoBar;
