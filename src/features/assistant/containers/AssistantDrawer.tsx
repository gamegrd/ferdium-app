import { observer } from 'mobx-react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import withStyles, { WithStylesProps } from 'react-jss';
import { Component, ReactElement } from 'react';
import {
  mdiViewGrid,
  mdiAudioInputRca,
  mdiCreditCardPlusOutline,
  mdiPhoneRotateLandscape,
} from '@mdi/js';
import Icon from '../../../components/ui/icon';


const styles = theme => ({
  assitant: {
    width: `${theme.workspaces.drawer.width}px`,
  },
  toolbar: {
    display: 'flex',
    width: '100%',
  },

  content: {
    flex: 1,
  },

  sidebar: {
    display: 'flex',
    flexFlow: 'column',
  },
});

function Card1() {
  return (
    <div>
        功能1 </div>);
}

function Card2() {
  return <div>Card 2 Content</div>;
}
function Card3() {
  return <div>Card 3 Content</div>;
}
function Card4() {
  return <div>Card 4 Content</div>;
}

interface IProps
  extends WithStylesProps<typeof styles>,
    WrappedComponentProps {}

interface IState {
  activeCard: string;
}
@observer
class AssistantDrawer extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: 'card1',
    };
  }

  setActiveCard = card => {
    this.setState({
      activeCard: card,
    });
  };

  render(): ReactElement {
    const cards = {
      card1: <Card1 />,
      card2: <Card2 />,
      card3: <Card3 />,
      card4: <Card4 />,
    };
    const { classes } = this.props;
    return (
      <div className={classes.assitant}>
        <div className="assistant franz-form">
          <div className="assistant__body">
            <div className={classes.toolbar}>
              <div className={classes.sidebar}>
                <button
                  type="button"
                  onClick={() => this.setActiveCard('card1')}
                >
                  <Icon icon={mdiViewGrid} size={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => this.setActiveCard('card2')}
                >
                  <Icon icon={mdiAudioInputRca} size={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => this.setActiveCard('card3')}
                >
                  <Icon icon={mdiCreditCardPlusOutline} size={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => this.setActiveCard('card4')}
                >
                  <Icon icon={mdiPhoneRotateLandscape} size={2.5} />
                </button>
              </div>
              <div className={classes.content}>
                {cards[this.state.activeCard]}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(
  withStyles(styles, { injectTheme: true })(AssistantDrawer),
);
