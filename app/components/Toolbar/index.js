import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import styles from './Toolbar.scss';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'gather',
      locale: 'en-US',
    };
  }

  get env() {
    return this.state;
  }

  onChangeMode(m) {
    console.log('onChangeMode:', m);
    this.setState({ mode: m }, () => {
      this.props.onEnvChanged(this.state);
    });
  }

  onChangeLang(l) {
    this.setState({ locale: l }, () => {
      this.props.onEnvChanged(this.state);
    });
  }

  render() {
    const { langs } = this.props;
    const showLangs = langs !== undefined && langs.length > 0;

    return (
      <div className={styles.root}>
        <Mode
          currentMode={this.env.mode}
          onChangeMode={this.onChangeMode.bind(this)}
          opts={[
            { value: 'gather', label: 'Answering question' },
            { value: 'evaluate', label: 'Evaluating response' },
          ]}
        />

        {showLangs && (
          <Langs
            onChangeLang={this.onChangeLang.bind(this)}
            currentLang={this.env.locale}
            langs={langs}
          />
        )}
      </div>
    );
  }
}

const Mode = props => (
  <div className={styles.mode}>
    <Label>Mode</Label>
    {props.opts.map((o, index) => (
      <ModeButton
        {...o}
        key={index}
        currentMode={props.currentMode}
        onChangeMode={props.onChangeMode}
      />
    ))}
  </div>
);

const Label = props => <span className={styles.label}>{props.children}</span>;

const ModeButton = props => (
  <RadioGroup value={props.value} onChange={props.onChangeMode.bind(null, props.value)}>
    <FormControlLabel
      value={props.value}
      checked={props.currentMode === props.value}
      control={<Radio />}
      label={props.label}
    />
  </RadioGroup>
);

const Langs = props => {
  const labels = {
    'en-US': 'English',
    'es-ES': 'Spanish',
    'zh-CN': 'Chinese',
  };

  const { langs, onChangeLang, currentLang } = props;

  return (
    <div className={styles.langs}>
      <Label>Language</Label>
      {langs.map(lang => (
        <RadioGroup value={lang} key={lang} onChange={onChangeLang.bind(null, lang)}>
          <FormControlLabel
            value={lang}
            checked={currentLang === lang}
            control={<Radio />}
            label={labels[lang]}
          />
        </RadioGroup>
      ))}
    </div>
  );
};
