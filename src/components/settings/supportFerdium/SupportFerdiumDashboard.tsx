import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  headline: {
    id: 'settings.supportFerdium.headline',
    defaultMessage: 'About DFgpt',
  },
  aboutIntro: {
    id: 'settings.supportFerdium.aboutIntro',
    defaultMessage: 'Special thanks goes to these awesome people:',
  },
  about: {
    id: 'settings.supportFerdium.about',
    defaultMessage:
      'The development of Ferdium is done by contributors. People who use Ferdium like you. They maintain, fix, and improve Ferdium in their spare time.',
  },
});

const SupportFerdiumDashboard = () => {
  const intl = useIntl();

  return (
    <div className="settings__main">
      <div className="settings__header">
        <span className="settings__header-item">
          {intl.formatMessage(messages.headline)}
        </span>
      </div>
      <div className="settings__body">
        <div>
          <p className="settings__message">
            {intl.formatMessage(messages.about)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportFerdiumDashboard;
