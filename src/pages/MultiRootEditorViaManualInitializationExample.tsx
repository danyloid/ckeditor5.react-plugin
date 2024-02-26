import { FC, useEffect, useRef } from "react";

import { MultiRootEditor } from "@ckeditor/ckeditor5-editor-multi-root";
import { ckeditorConfiguration, ckeditorExampleContent } from "../ckeditor";

const toolbarContainerId = "ckeditor-toolbar";
const contentContainerId = "ckeditor-content";

const unsafeContent = {
  __html: ckeditorExampleContent,
};

export const MultiRootEditorViaManualInitializationExample: FC = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const contentWrapper = document.getElementById(contentContainerId);
    const toolbarWrapper = document.getElementById(toolbarContainerId);

    if (!contentWrapper) return;

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

    isInitialized.current = true;
  }, []);

  return (
    <div>
      <h2>
        Using CKEditor 5 Multi Root Editor with the generated content plugin
        intialized via manual useEffect call
      </h2>
      <div>
        <div id={toolbarContainerId} />
        <div id={contentContainerId} dangerouslySetInnerHTML={unsafeContent} />
      </div>
    </div>
  );
};
