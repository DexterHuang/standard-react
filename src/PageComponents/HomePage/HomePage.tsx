import * as React from "react";
import { Text } from "../../StandardComponents/Text/Text";
interface Props {}
export const HomePage: React.FC<Props> = (props: Props) => {
  const {} = props;
  return (
    <div>
      <Text header1>Im Home page</Text>
      <Text header2>Im Home page</Text>
      <Text header3>Im Home page</Text>
      <Text>Im Home page</Text>
    </div>
  );
};
