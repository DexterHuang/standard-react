import { Route } from "react-router-dom";
import * as React from "react";
import { HomePage } from "../../PageComponents/HomePage/HomePage";

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
      </div>
    );
  }
}
