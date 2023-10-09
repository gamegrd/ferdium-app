import { injectIntl, WrappedComponentProps } from 'react-intl';
import { Component, ReactElement } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';
import Select from '../../../components/ui/Select';
import Toggle from '../../../components/ui/toggle';
import Form from '../../../lib/Form';

const styles = () => ({
  translatorsettings: {
    margin: '20px',
  },
});

interface IProps extends WithStylesProps<typeof styles>, WrappedComponentProps {
  form: Form;
}

interface IState {}

@observer
class AssistantTranslator extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  submit(e): void {
    console.warn(e);
    if (e) {
      e.preventDefault();
    }

    const { form } = this.props;
    const values = form.values();
    console.warn(values);
  }

  render(): ReactElement {
    const { form } = this.props;
    const { classes } = this.props;
    // console.warn('-----------------');
    // console.warn(form.$('translateRecv').bind());
    return (
      <div className={classes.translatorsettings}>
        <form onChange={e => this.submit(e)} id="form">
          <Toggle {...form.$('translateRecv').bind()} />
          <Toggle {...form.$('translateSend').bind()} />
          <Select field={form.$('translatorLanguage')} />
        </form>
      </div>
    );
  }
}

export default injectIntl(
  withStyles(styles, { injectTheme: true })(AssistantTranslator),
);
