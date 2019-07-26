import { Route } from "react-router-dom";
import * as React from "react";
import { HomePage } from "../../PageComponents/HomePage/HomePage";
import { ModalDispatcher } from "../ModalDispatcher/ModalDispatcher";
import { ModalHandler } from "../../Handler/ModalHandler";
import { SandboxPage } from "../../PageComponents/SandboxPage/SandboxPage";
interface Props {}
interface States {}
export class AppLayout extends React.Component<Props, States> {
  static defaultProps = {};
  state = {};
  render() {
    const {} = this.props;
    const {} = this.state;
    return (
      <div>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/sandbox" exact={true} component={SandboxPage} />
        <ModalDispatcher ref={ref => (ModalHandler.modalDispatcher = ref)} />
      </div>
    );
  }
}
