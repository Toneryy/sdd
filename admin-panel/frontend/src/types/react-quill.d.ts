declare module "react-quill" {
  import * as React from "react";
  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    theme?: string;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any
    ) => void;
    modules?: any;
    formats?: string[];
    placeholder?: string;
    className?: string;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
