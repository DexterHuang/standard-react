import * as React from "react";
interface Props {
  children: any;
  forceShow?: boolean;
  style?: React.CSSProperties;
  className?: string;
  unloadWhenHidden?: boolean;
  height?: number | string;
  width?: number | string;
  overflowParentId?: string;
  tolerance?: number;
  executionThreshold?: number;
}
interface States {
  shouldShow: boolean;
}
export class LazyRender extends React.Component<Props, States> {
  static defaultProps = { unloadWhenHidden: false, tolerance: 0, executionThreshold: 16 };
  state = { shouldShow: !!this.props.forceShow || !typeof IntersectionObserver };
  observer: IntersectionObserver;
  myRef: any;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    if (isBrowser() && !this.state.shouldShow) {
      this.observer = new IntersectionObserver(this.onIntersect);
      this.observer.observe(this.myRef.current);
    }
  }
  @AutoBind
  onIntersect(entries) {
    const { isIntersecting, intersectionRatio } = entries[0];
    if (isIntersecting === true || intersectionRatio > 0) {
      this.observer.disconnect();
      this.setState({ shouldShow: true });
    }
  }
  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
  render() {
    const { children, style, className, width, height } = this.props;
    const { shouldShow } = this.state;
    // Logger.logInfo("potato", "LazyRender");
    return (
      <div
        style={{ width, height, position: "relative", ...style }}
        className={`${styles.container} ${className || ""}`}
        key="parent"
        ref={this.myRef}
      >
        <div key="child" style={{ height: "100%", width: "100%", position: "absolute" }}>
          {shouldShow && children}
        </div>
      </div>
    );
  }
}
