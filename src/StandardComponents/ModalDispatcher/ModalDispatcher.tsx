import * as React from "react";
import { View } from "../View/View";
import { card } from "../../Theme/Variables";
import { CloseIcon } from "../CloseIcon/CloseIcon";
import { AutoBind } from "../../Helper/ReactHelper";
export interface ModalOptions {
  containerStyle?: React.CSSProperties;
  undismissable?: boolean;
}
interface Props {}
interface States {
  content: any;
  options: ModalOptions;
}
export class ModalDispatcher extends React.Component<Props, States> {
  static defaultProps = {};
  state: States = {
    content: (
      <div>
        <p>Hello</p>
      </div>
    ),
    options: {}
  };
  show(content: any, options: ModalOptions = {}) {
    this.setState({ content, options });
  }
  close() {
    this.setState({ content: null, options: null });
  }
  render() {
    const { content, options } = this.state;
    return (
      <View
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none"
        }}
      >
        {content && (
          <View
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.3)",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "initial"
            }}
            onClick={e => {
              if (!options.undismissable) {
                this.close();
              }
            }}
          >
            <View
              style={{ padding: 16, minHeight: "30vh", minWidth: "40vw", ...card(1), ...options.containerStyle }}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {!options.undismissable && (
                <View style={{ alignItems: "flex-end" }}>
                  <CloseIcon onClick={() => this.close()} />
                </View>
              )}
              {content}
            </View>
          </View>
        )}
      </View>
    );
  }
}
