import { FC } from "react";

import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import { MultiRootEditor } from "@ckeditor/ckeditor5-editor-multi-root";
import { ckeditorConfiguration, ckeditorExampleContent } from "../ckeditor";

export const MultiRootEditorViaHookExample: FC = () => {
  const { toolbarElement, editableElements } = useMultiRootEditor({
    data: {
      "multi-root-editor-main": ckeditorExampleContent,
    },
    editor: MultiRootEditor,
    config: ckeditorConfiguration,
  });

  return (
    <div>
      <h2>
        Using CKEditor 5 Multi Root Editor with the generated content plugin
        intialized via hook
      </h2>
      <div>
        <div>{toolbarElement}</div>
        <div>{editableElements}</div>
      </div>
    </div>
  );
};
