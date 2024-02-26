import { FC, useEffect } from "react";

import { MultiRootEditor } from "@ckeditor/ckeditor5-editor-multi-root";
import { ckeditorConfiguration, ckeditorExampleContent } from "../ckeditor";

const unsafeContent = {
  __html: ckeditorExampleContent,
};

export const MultiRootEditorViaManualInitializationExample: FC = () => {
  useEffect(() => {
    const contentWrapper = document.getElementById(
      "ckeditor-content"
    ) as HTMLElement;

    const toolbarWrapper = document.getElementById("toolbar");

    MultiRootEditor.create(
      {
        main: contentWrapper,
      },
      ckeditorConfiguration
    ).then((editor) => {
      toolbarWrapper?.appendChild(
        editor.ui.view.toolbar.element as HTMLElement
      );
    });
  }, []);

  return (
    <div>
      <h2>
        Using CKEditor 5 Multi Root Editor with the generated content plugin
        intialized via manual useEffect call
      </h2>
      <div>
        <div id="ckeditor-toolbar" />
        <div id="ckeditor-content" dangerouslySetInnerHTML={unsafeContent} />
      </div>
    </div>
  );
};
