import * as React from "react";
import { ModalHandler } from "../../Handler/ModalHandler";
import { View } from "../../StandardComponents/View/View";

interface Props {}
interface States {}
export class SandboxPage extends React.Component<Props, States> {
  static defaultProps = {};
  state = {};
  render() {
    const {} = this.props;
    const {} = this.state;
    return (
      <div>
        <button onClick={() => ModalHandler.show(<View>Hello world</View>)}>Modal</button>
      </div>
    );
  }
}
